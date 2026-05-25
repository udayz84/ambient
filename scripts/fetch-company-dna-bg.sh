#!/usr/bin/env bash
# Download Figma node 2379:2088 (image 137) for Company DNA background.
#
# Prerequisites:
#   1. Figma Desktop open on "Ambient - Dev File"
#   2. Dev Mode enabled, node 2379:2088 selected (or linked from Figma)
#   3. Figma MCP / asset server running at http://127.0.0.1:3845
#
# Usage:
#   ./scripts/fetch-company-dna-bg.sh                    # uses ASSET_HASH env or arg
#   ./scripts/fetch-company-dna-bg.sh <40-char-sha1-hash>
#
# Get hash: in Cursor, run Figma MCP get_design_context for node 2379:2088 and copy
# the filename from localhost:3845/assets/<hash>.png

set -euo pipefail

HASH="${1:-${ASSET_HASH:-}}"
BASE="${FIGMA_ASSET_BASE:-http://127.0.0.1:3845/assets}"
DEST="$(cd "$(dirname "$0")/.." && pwd)/public/company/dna-section-bg.png"

if [[ -z "$HASH" ]]; then
  echo "Missing asset hash."
  echo "Select node 2379:2088 in Figma Dev Mode, then pass the 40-char hash from:"
  echo "  http://localhost:3845/assets/<hash>.png"
  exit 1
fi

mkdir -p "$(dirname "$DEST")"
code=$(curl -sL -w "%{http_code}" -o "$DEST" "$BASE/${HASH}.png")
size=$(wc -c < "$DEST" | tr -d ' ')

if [[ "$code" != "200" ]] || [[ "$size" -lt 1000 ]]; then
  echo "Download failed (HTTP $code, ${size} bytes). Is Figma open with node 2379:2088 selected?"
  exit 1
fi

if ! file -b "$DEST" | grep -q 'PNG image'; then
  echo "Downloaded file is not a PNG. Check hash and Figma selection."
  exit 1
fi

sips -g pixelWidth -g pixelHeight "$DEST" 2>/dev/null || true
echo "Saved $DEST (${size} bytes)"
