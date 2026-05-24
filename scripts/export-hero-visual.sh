#!/usr/bin/env bash
# Export hero visual from Figma Dev Mode MCP (Figma desktop must be open).
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/export-hero-mask-group.mjs
