import { load } from 'cheerio';

async function run() {
  const url = 'https://offstone.fr/biens/maison-iena-hotel-de-luxe-paris/';
  const res = await fetch(url);
  const html = await res.text();
  const m = html.match(/"featuredImage"\s*:\s*"(https?:[^\"]+)"/);
  console.log('featuredImage match:', m && m[1]);
  const m2 = html.match(/"thumbnailUrl"\s*:\s*"(https?:[^\"]+)"/);
  console.log('thumbnailUrl match:', m2 && m2[1]);
  const $ = load(html);
  console.log('og image:', $('meta[property="og:image"]').attr('content'));
}
run().catch(e => { console.error(e); process.exit(1); });

