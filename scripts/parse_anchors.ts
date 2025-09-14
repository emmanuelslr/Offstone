import fs from 'node:fs';

const html = fs.readFileSync('tmp_realisations.html','utf8');
const re = /href="([^"]+)"/g;
const links = new Set<string>();
let m: RegExpExecArray | null;
while ((m = re.exec(html))) links.add(m[1]);
console.log('count', links.size);
const arr = Array.from(links);
console.log(arr.slice(0,150));
console.log('detail guess', arr.filter(h=>/\/real/i.test(h) && !/\/realisations\/?$/.test(h)).slice(0,100));

