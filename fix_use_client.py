import os

components_dir = '/Users/udayznanam/Documents/ambient/src/components'

files_to_fix = [
    'company/CompanyMobile.tsx',
    'developer/DeveloperHeroContent.tsx',
    'products-page/ProductsBenchToVolume.tsx',
    'products-page/ProductsHero.tsx',
    'products-page/ProductsStartBuilding.tsx',
    'products-page/ProductsUseCases.tsx',
    'resources/ResourcesMobile.tsx'
]

for file in files_to_fix:
    filepath = os.path.join(components_dir, file)
    with open(filepath, 'r') as f:
        content = f.read()
    
    if '"use client"' in content:
        content = content.replace('"use client";\n', '')
        content = content.replace('"use client"\n', '')
        content = '"use client";\n' + content.strip() + '\n'
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed {file}")

