import os
import re

components_dir = '/Users/udayznanam/Documents/ambient/src/components'

corner_pattern = re.compile(
    r'(\s*\{/\* Custom Corners.*?\*/\}\s*)?' + 
    r'\s*<div className="pointer-events-none absolute -(?:top|bottom)-\[0\.5px\].*?</div>\s*</div>\s*</div>\s*' +
    r'<div className="pointer-events-none absolute -(?:top|bottom)-\[0\.5px\].*?</div>\s*</div>\s*</div>\s*' +
    r'<div className="pointer-events-none absolute (?:right|left)-0 bottom-0.*?</div>\s*</div>\s*</div>\s*' +
    r'<div className="pointer-events-none absolute bottom-0 (?:left|right)-0.*?</div>\s*</div>\s*</div>',
    re.DOTALL
)

corner_pattern_alt = re.compile(
    r'\s*<div className="pointer-events-none absolute -top-\[0\.5px\].*?</div>\s*</div>\s*</div>\s*' +
    r'<div className="pointer-events-none absolute -top-\[0\.5px\].*?</div>\s*</div>\s*</div>\s*' +
    r'<div className="pointer-events-none absolute right-0 bottom-0.*?</div>\s*</div>\s*</div>\s*' +
    r'<div className="pointer-events-none absolute bottom-0 left-0.*?</div>\s*</div>\s*</div>',
    re.DOTALL
)

count = 0
for root, dirs, files in os.walk(components_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            if 'from-[#6ced3f] to-[#38a612]' in content and ('corner-tag-1.svg' in content or 'corner-tag-2.svg' in content):
                new_content, num_subs = re.subn(corner_pattern, '\n        <GreenCtaCorners />', content)
                if num_subs == 0:
                    new_content, num_subs = re.subn(corner_pattern_alt, '\n        <GreenCtaCorners />', content)
                
                if num_subs > 0:
                    if 'import { GreenCtaCorners }' not in new_content:
                        # find relative path to shared/GreenCtaCorners
                        rel_path = os.path.relpath(os.path.join(components_dir, 'shared'), root)
                        if rel_path == '.': rel_path = './'
                        elif not rel_path.startswith('.'): rel_path = './' + rel_path
                        import_stmt = f'import {{ GreenCtaCorners }} from "{rel_path}/GreenCtaCorners";\n'
                        
                        # Add after last import
                        lines = new_content.split('\n')
                        last_import = max((i for i, line in enumerate(lines) if line.startswith('import ')), default=-1)
                        if last_import >= 0:
                            lines.insert(last_import + 1, import_stmt.strip())
                        else:
                            lines.insert(0, import_stmt.strip())
                        new_content = '\n'.join(lines)
                    
                    with open(filepath, 'w') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")
                    count += 1
                else:
                    print(f"Found green button but couldn't match corners in {filepath}")

print(f"Total files updated: {count}")
