const fs = require('fs');
const content = fs.readFileSync('src/components/shared/WaitlistModal.tsx', 'utf8');
const start = content.indexOf(`            {twoCols && (`);
const end = content.indexOf(`          {/* Global bottom action bar spanning full modal width */}`, start);
console.log(content.slice(start, end));
