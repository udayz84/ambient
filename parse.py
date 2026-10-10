import re
import sys

def html_to_markdown(html_content):
    # Very basic html to markdown for the specific structure of this Webflow site
    # Extract the main content container
    content = html_content
    match = re.search(r'<div class="terms-condition-container">(.*?)</div>\s*</div>\s*</section>', content, re.DOTALL)
    if match:
        content = match.group(1)
        
    # Replace headers
    content = re.sub(r'<h1[^>]*>(.*?)</h1>', r'# \1\n\n', content, flags=re.IGNORECASE)
    content = re.sub(r'<h2[^>]*>(.*?)</h2>', r'## \1\n\n', content, flags=re.IGNORECASE)
    content = re.sub(r'<h3[^>]*>(.*?)</h3>', r'### \1\n\n', content, flags=re.IGNORECASE)
    content = re.sub(r'<h4[^>]*>(.*?)</h4>', r'#### \1\n\n', content, flags=re.IGNORECASE)
    
    # Replace bold
    content = re.sub(r'<strong[^>]*>(.*?)</strong>', r'**\1**', content, flags=re.IGNORECASE)
    content = re.sub(r'<div class="terms-conditions-bold-text"[^>]*>(.*?)</div>', r'**\1**\n\n', content, flags=re.IGNORECASE)
    
    # Replace links
    content = re.sub(r'<a href="(.*?)"[^>]*>(.*?)</a>', r'[\2](\1)', content, flags=re.IGNORECASE)
    
    # Replace list items
    content = re.sub(r'<li[^>]*><div[^>]*>(.*?)<br/></div></li>', r'- \1\n', content, flags=re.IGNORECASE)
    content = re.sub(r'<li[^>]*>(.*?)</li>', r'- \1\n', content, flags=re.IGNORECASE)
    
    # Replace paragraphs / divs
    content = re.sub(r'<div class="terms-cobditions-text"[^>]*>(.*?)<br/></div>', r'\1\n\n', content, flags=re.IGNORECASE)
    content = re.sub(r'<div class="terms-cobditions-text"[^>]*>(.*?)</div>', r'\1\n\n', content, flags=re.IGNORECASE)
    
    # Remove all other tags
    content = re.sub(r'<[^>]+>', '', content)
    
    # Unescape common html entities
    content = content.replace('&#x27;', "'").replace('&amp;', '&').replace('&quot;', '"')
    
    return content.strip()

with open('/Users/udayznanam/.gemini/antigravity-ide/brain/830141c0-6fcc-4ffa-9358-2a463bec56cc/.system_generated/steps/391/content.md', 'r') as f:
    html = f.read()
    
md = html_to_markdown(html)
with open('/Users/udayznanam/.gemini/antigravity-ide/brain/830141c0-6fcc-4ffa-9358-2a463bec56cc/legal_pages_content.md', 'a') as out:
    out.write("\n\n" + md)
    
print("Done")
