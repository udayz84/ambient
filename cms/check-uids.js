const fs = require('fs');
const glob = require('glob');

const schemas = glob.sync('src/api/*/content-types/*/schema.json');
const validUIDs = new Set();

schemas.forEach(f => {
  const match = f.match(/src[\/\\]api[\/\\]([^\/\\]+)[\/\\]/);
  const apiName = match[1];
  
  let raw = fs.readFileSync(f, 'utf8');
  if(raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
  const data = JSON.parse(raw);
  const singularName = data.info.singularName;
  
  const uid = `api::${apiName}.${singularName}`;
  validUIDs.add(uid);
});

const routes = glob.sync('src/api/*/routes/*.ts');
routes.forEach(r => {
  const code = fs.readFileSync(r, 'utf8');
  const match = code.match(/createCoreRouter\(['"]([^'"]+)['"]/);
  if(match) {
    const routeUid = match[1];
    if (!validUIDs.has(routeUid)) {
      console.log(`\nERROR: Route in ${r} uses UID "${routeUid}" which is not registered!`);
    }
  }
});
