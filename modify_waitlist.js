const fs = require('fs');
const path = require('path');
const file = path.join('src','components','shared','WaitlistModal.tsx');
let text = fs.readFileSync(file,'utf8');
const target = "    setData({ consent: false, phone_country: 'FR' });";
if (text.includes(target) && !text.includes('setIsCalendarMobileOpen(false);')) {
  text = text.replace(target, "    setData({ consent: false, phone_country: 'FR' });\r\n    setIsCalendarMobileOpen(false);");
  fs.writeFileSync(file, text, 'utf8');
}
