import os
import re

components_dir = '/Users/udayznanam/Documents/ambient/src/components'

count = 0
for root, dirs, files in os.walk(components_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            # Find all instances of GreenCtaButton usage or manual green buttons
            if 'from-[#6ced3f] to-[#38a612]' in content:
                original = content
                
                # We want to replace <CornerDecor /> or <Corners /> with <GreenCtaCorners />
                # ONLY when they are inside a green button.
                # A simple heuristic: if a file has a green button, it's highly likely any CornerDecor 
                # inside the green button needs changing. But what if there are non-green buttons?
                # Let's replace corners that are in close proximity to the green gradient.
                
                # We can use regex to find the green gradient span, and replace the NEXT <CornerDecor /> or <Corners />
                pattern = r'(from-\[\#6ced3f\] to-\[\#38a612\].*?)(<Corners />|<CornerDecor />)'
                content, num_subs = re.subn(pattern, r'\1<GreenCtaCorners />', content, flags=re.DOTALL)
                
                if num_subs > 0:
                    if 'import { GreenCtaCorners }' not in content:
                        rel_path = os.path.relpath(os.path.join(components_dir, 'shared'), root)
                        if rel_path == '.': rel_path = './'
                        elif not rel_path.startswith('.'): rel_path = './' + rel_path
                        import_stmt = f'import {{ GreenCtaCorners }} from "{rel_path}/GreenCtaCorners";\n'
                        
                        lines = content.split('\n')
                        last_import = max((i for i, line in enumerate(lines) if line.startswith('import ')), default=-1)
                        if last_import >= 0:
                            lines.insert(last_import + 1, import_stmt.strip())
                        else:
                            lines.insert(0, import_stmt.strip())
                        content = '\n'.join(lines)
                    
                    with open(filepath, 'w') as f:
                        f.write(content)
                    print(f"Updated {filepath}")
                    count += 1
                
print(f"Total files updated: {count}")
