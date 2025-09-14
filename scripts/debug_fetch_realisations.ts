// Quick debug to list links on Aguesseau realisations page
import { load } from 'cheerio';

async function main() {
  const res = await fetch('https://aguesseaucapital.com/realisations/', { headers: { 'user-agent': 'Offstone-Debug/1.0' } });
  const html = await res.text();
  const $ = load(html);
  const hrefs: string[] = [];
  $('a').each((_, el) => {
    const href = $(el).attr('href') || '';
    if (href) hrefs.push(href);
  });
  console.log('anchors', hrefs.length);
  const detail = hrefs.filter(h => /realisations\//.test(h) && !/\/?realisations\/?$/.test(h));
  console.log('detail-like links', detail.length);
  console.log(detail.slice(0, 50));
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
