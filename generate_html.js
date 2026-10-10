const fs = require('fs');

const markdown = fs.readFileSync('/Users/udayznanam/.gemini/antigravity-ide/brain/830141c0-6fcc-4ffa-9358-2a463bec56cc/legal_pages_content.md', 'utf8');

// A very simple markdown to html converter for our specific needs
function mdToHtml(md) {
  let html = md;
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');
  
  // Lists
  html = html.replace(/^\- (.*$)/gim, '<ul><li>$1</li></ul>');
  html = html.replace(/<\/ul>\n<ul>/gim, '\n');
  
  // Paragraphs
  html = html.replace(/^\s*(\n)?(.+)/gim, function(m) {
    if(/<(\/)?(h1|h2|h3|ul|li)/.test(m)) return m;
    return '<p>' + m.trim() + '</p>';
  });
  
  return html;
}

const htmlContent = mdToHtml(markdown);

const finalHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Clean Legal Pages</title>
<style>
  body { font-family: sans-serif; max-width: 800px; margin: 40px auto; line-height: 1.6; }
</style>
</head>
<body>
${htmlContent}
</body>
</html>
`;

fs.writeFileSync('/Users/udayznanam/.gemini/antigravity-ide/brain/830141c0-6fcc-4ffa-9358-2a463bec56cc/clean_legal_pages.html', finalHtml);
console.log('Generated clean_legal_pages.html');
