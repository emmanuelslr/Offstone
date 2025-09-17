const fs = require('fs');
const path = 'src/components/shared/WaitlistModal.tsx';
const content = fs.readFileSync(path, 'utf8');
const start = content.indexOf("{current === 'calendly' && (");
const end = content.indexOf("                    {current === 'discovery'", start);
console.log(content.slice(start, end));
