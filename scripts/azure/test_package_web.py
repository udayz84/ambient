"""Exercise package isolation using an independent temporary Git repository."""
import hashlib
import importlib.util
import json
import subprocess
import tempfile
import unittest
import zipfile
from pathlib import Path

spec = importlib.util.spec_from_file_location("package_web", Path(__file__).with_name("package-web.py"))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class PackageTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.old_root, self.old_config = module.ROOT, module.CONFIG
        self.addCleanup(self.restore)
        module.ROOT = self.root
        module.CONFIG = {"icons": ["favicon.ico", "icon.png", "apple-icon.png"], "packagePaths": ["package.json", "src", "public"]}
        self.git("init", "--quiet")
        self.git("config", "user.email", "test@example.invalid")
        self.git("config", "user.name", "Package test")
        for path, data in {
            "package.json": "{}", "src/page.tsx": "committed source",
            "src/app/favicon.ico": "ico", "src/app/icon.png": "png", "src/app/apple-icon.png": "apple",
            "public/image.webp": "before", "cms/private.txt": "cms must stay out", ".env.production": "secret must stay out",
        }.items():
            self.write(path, data)
        self.git("add", ".")
        self.git("commit", "--quiet", "-m", "baseline")
        self.base = self.git("rev-parse", "HEAD").strip()

    def restore(self):
        module.ROOT, module.CONFIG = self.old_root, self.old_config

    def git(self, *args):
        return subprocess.check_output(["git", *args], cwd=self.root).decode()

    def write(self, path, data):
        target = self.root / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(data, encoding="utf8")

    def test_only_committed_website_sources_and_exact_changed_assets(self):
        self.write("public/image.webp", "after")
        self.git("add", ".")
        self.git("commit", "--quiet", "-m", "changed asset")
        ref = self.git("rev-parse", "HEAD").strip()
        self.write("src/page.tsx", "unrelated local edit")
        self.write("src/untracked.tsx", "untracked local edit")
        output, manifest = self.root / "out.zip", self.root / "manifest.json"
        module.package(ref, self.base, output, manifest)
        with zipfile.ZipFile(output) as archive:
            self.assertEqual(archive.read("src/page.tsx"), b"committed source")
            self.assertNotIn("src/untracked.tsx", archive.namelist())
            self.assertNotIn("cms/private.txt", archive.namelist())
            self.assertNotIn(".env.production", archive.namelist())
            self.assertEqual(archive.read(".npmrc"), b"include=dev\n")
        data = json.loads(manifest.read_text())
        self.assertEqual(data["assets"], [{"path": "/image.webp", "sha256": hashlib.sha256(b"after").hexdigest()}])

    def test_rejects_nested_tracked_secrets_and_inexact_refs(self):
        self.write("src/.env.local", "must never ship")
        self.git("add", ".")
        self.git("commit", "--quiet", "-m", "secret fixture")
        ref = self.git("rev-parse", "HEAD").strip()
        with self.assertRaisesRegex(ValueError, "Forbidden deployment file"):
            module.package(ref, self.base, self.root / "bad.zip", self.root / "bad.json")
        with self.assertRaises(ValueError):
            module.commit("cms")

    def test_local_only_assets_are_not_treated_as_blob_uploads(self):
        self.assertFalse(module.blob_asset("public/hero/ambient-hero-v2.mp4"))
        self.assertFalse(module.blob_asset("public/hero-mask.svg"))
        self.assertTrue(module.blob_asset("public/feature.webp"))


if __name__ == "__main__":
    unittest.main()
