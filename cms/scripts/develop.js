const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.join(__dirname, '..');
const BIN = path.join(ROOT, 'node_modules', '@strapi', 'strapi', 'bin', 'strapi.js');

process.env.NODE_OPTIONS = `${process.env.NODE_OPTIONS || ''} --require ${path.join(__dirname, 'ts-hook.js')}`.trim();

const child = spawn(process.execPath, [BIN, 'develop', ...process.argv.slice(2)], {
  cwd: ROOT,
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code, signal) => {
  process.exit(signal ? 1 : code == null ? 0 : code);
});
