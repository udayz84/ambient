const fs = require('fs');
const glob = require('glob');
const path = require('path');

const files = glob.sync('/Users/udayznanam/Documents/ambient/src/components/**/*.tsx');
console.log(`Found ${files.length} files`);
