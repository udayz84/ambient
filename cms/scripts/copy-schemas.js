const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const DEST = path.join(ROOT, 'dist', 'src');

function copyJSON(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyJSON(srcPath, destPath);
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyJSON(SRC, DEST);
