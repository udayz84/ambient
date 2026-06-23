import os
import urllib.request
import json
import sys

TOKEN = os.environ.get("FIGMA_TOKEN", "")
FILE_KEY = "sT6AIgewcVoZCKuhkfbkBg"

if not TOKEN:
    print("No Figma token found in env")
    sys.exit(1)

req = urllib.request.Request(f"https://api.figma.com/v1/files/{FILE_KEY}/nodes?ids=4320:530")
req.add_header("X-Figma-Token", TOKEN)

try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        print(json.dumps(data, indent=2))
except Exception as e:
    print(f"Error: {e}")
