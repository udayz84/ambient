const fs = require('fs');
const glob = require('glob');
const routes = glob.sync('src/api/*/routes/*.ts');
routes.forEach(r => {
  const code = fs.readFileSync(r, 'utf8');
  const match = code.match(/createCoreRouter\(['"](api::[^.]+\.[^'"]+)['"]\)/);
  if(match) {
    const uid = match[1];
    const parts = uid.match(/api::([^.]+)\.(.+)/);
    const apiName = parts[1];
    const ctName = parts[2];
    const schemaFile = 'src/api/' + apiName + '/content-types/' + ctName + '/schema.json';
    if (!fs.existsSync(schemaFile)) {
      console.log('Missing schema file: ' + schemaFile + ' for route ' + r);
    } else {
      let raw = fs.readFileSync(schemaFile, 'utf8');
      if(raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
      const schema = JSON.parse(raw);
      if (schema.info.singularName !== ctName) {
        console.log('UID mismatch in ' + r + ': router uses ' + ctName + ' but schema singularName is ' + schema.info.singularName);
      }
    }
  }
});
