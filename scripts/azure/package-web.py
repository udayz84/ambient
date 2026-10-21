"""Package only committed website sources; never package local edits or secrets."""
import argparse
import hashlib
import json
import re
import subprocess
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CONFIG = json.loads((Path(__file__).with_name("deployment-config.json")).read_text())
ASSET_EXTENSIONS = set("avif bin bmp doc docx eot gif ico jpeg jpg mid mov mp3 mp4 oga ogg ogv otf pdf png ppt pptx psd svg tif tiff ttf wav webm webp woff woff2 xls xlsx zip".split())


def git(*args):
    return subprocess.check_output(["git", *args], cwd=ROOT)


def commit(value):
    if not re.fullmatch(r"[a-f0-9]{40}", value):
        raise ValueError("A full, lowercase Git commit SHA is required.")
    if git("rev-parse", "--verify", value + "^{commit}").decode().strip() != value:
        raise ValueError("Commit does not resolve exactly.")
    return value


def blob_asset(path):
    pathname = "/" + path.removeprefix("public/")
    if pathname == "/hero/ambient-hero-v2.mp4":
        return False
    if re.search(r"(^|[-_])mask[._-]", Path(path).name):
        return False
    return Path(path).suffix.lstrip(".").lower() in ASSET_EXTENSIONS


def package(ref, base, output, manifest_path):
    ref, base = commit(ref), commit(base)
    changed = git("diff", "--name-only", "--diff-filter=AM", "-z", base, ref, "--", "public").decode().split("\0")
    assets = []
    for path in filter(None, changed):
        if blob_asset(path):
            assets.append({"path": "/" + path.removeprefix("public/"), "sha256": hashlib.sha256(git("show", f"{ref}:{path}")).hexdigest()})
    icons = [{"path": "/" + name, "sha256": hashlib.sha256(git("show", f"{ref}:src/app/{name}")).hexdigest()} for name in CONFIG["icons"]]
    manifest = {"schema": 1, "commit": ref, "baseCommit": base, "assets": assets, "icons": icons}
    output = Path(output).resolve()
    output.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(["git", "archive", "--format=zip", f"--output={output}", ref, *CONFIG["packagePaths"]], cwd=ROOT, check=True)
    with zipfile.ZipFile(output, "a", compression=zipfile.ZIP_DEFLATED) as archive:
        # This also makes historical rollback packages install build dependencies.
        archive.writestr(".npmrc", "include=dev\n")
        archive.writestr(".ambient-release.json", json.dumps(manifest))
        for name in archive.namelist():
            parts = Path(name).parts
            if name.startswith("cms/") or any(part in (".git", "node_modules") or part.startswith(".env") for part in parts):
                raise ValueError(f"Forbidden deployment file: {name}")
    Path(manifest_path).write_text(json.dumps(manifest, indent=2), encoding="utf8")
    print(f"Packaged {ref}: {output.stat().st_size} bytes; {len(assets)} changed Blob assets to verify.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ref", required=True)
    parser.add_argument("--base", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--manifest", required=True)
    args = parser.parse_args()
    package(args.ref, args.base, args.output, args.manifest)
