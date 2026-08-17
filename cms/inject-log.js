const fs = require('fs');
const path = 'node_modules/@strapi/core/dist/factories.js';
let code = fs.readFileSync(path, 'utf8');

if (!code.includes('Resolving UID')) {
  code = code.replace(
    'const contentType = strapi.contentType(uid);',
    'console.log("Resolving UID:", uid); const contentType = strapi.contentType(uid); if (!contentType) console.error("CONTENT TYPE NOT FOUND:", uid);'
  );
  fs.writeFileSync(path, code);
  console.log("Patched factories.js");
} else {
  console.log("Already patched");
}

require('@strapi/strapi')().start().catch(err => {
  console.error('Strapi crashed:', err);
  process.exit(1);
});
