const fs = require('fs');
const content = fs.readFileSync('src/components/shared/WaitlistModal.tsx', 'utf8');
const start = content.indexOf(`              {current === 'calendly' && isCalendarMobileOpen && (`);
const end = content.indexOf(`            </div>\r\n\r\n            {twoCols && (`, start);
console.log(content.slice(start, end));
