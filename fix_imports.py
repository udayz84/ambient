import os
import re

components_dir = '/Users/udayznanam/Documents/ambient/src/components'

files_to_fix = [
    'developer/DeveloperMobile.tsx',
]

for file in files_to_fix:
    filepath = os.path.join(components_dir, file)
    with open(filepath, 'r') as f:
        content = f.read()
    
    import_match = re.search(r'import\s+\{\s*GreenCtaCorners\s*\}\s+from\s+"[^"]+";\n?', content)
    if import_match:
        import_stmt = import_match.group(0)
        content = content.replace(import_stmt, '')
        content = import_stmt.strip() + '\n' + content
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed {file}")

