const fs = require('fs');

const sql = fs.readFileSync('tmp_backup.sql', 'utf8');
const lines = sql.split('\n');

const files = {}; // id -> file info
const morphs = []; // { file_id, related_id, related_type, field }

let currentTable = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.startsWith('COPY public.files ')) {
    currentTable = 'files';
    continue;
  } else if (line.startsWith('COPY public.files_related_mph ')) {
    currentTable = 'files_related_mph';
    continue;
  } else if (line.startsWith('COPY public.')) {
    currentTable = null; // some other table
    continue;
  }
  
  if (line === '\\.') {
    currentTable = null;
    continue;
  }
  
  if (currentTable === 'files') {
    const parts = line.split('\t');
    if (parts.length > 10) {
      const id = parts[0];
      const name = parts[2];
      const url = parts[13];
      files[id] = { name, url };
    }
  } else if (currentTable === 'files_related_mph') {
    const parts = line.split('\t');
    if (parts.length >= 5) {
      morphs.push({
        id: parts[0],
        file_id: parts[1],
        related_id: parts[2],
        related_type: parts[3],
        field: parts[4]
      });
    }
  }
}

// Find all components and their files
// To do this simply, we can just group morphs by related_type and list the files
const byType = {};
for (const m of morphs) {
  if (!byType[m.related_type]) byType[m.related_type] = [];
  if (files[m.file_id]) {
    byType[m.related_type].push({
      related_id: m.related_id,
      field: m.field,
      file: files[m.file_id]
    });
  }
}

// Print out the files for each component type
for (const type in byType) {
  if (type.includes('home') || type.includes('som') || type.includes('dvk')) continue;
  
  console.log(`\n=== ${type} ===`);
  const uniqueFiles = new Set();
  for (const item of byType[type]) {
    const fileUrl = item.file.url;
    if (!uniqueFiles.has(fileUrl)) {
      uniqueFiles.add(fileUrl);
      console.log(`- ${item.field}: ${fileUrl} (${item.file.name})`);
    }
  }
}
