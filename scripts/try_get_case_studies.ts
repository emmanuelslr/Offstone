import { getCaseStudies } from '../src/lib/prismic/caseStudies';

getCaseStudies().then(list => {
  console.log('count', list.length);
  console.log(list.slice(0,3).map(x => ({ uid: x.uid, title: x.title })));
}).catch(e => {
  console.error(e);
  process.exit(1);
});

