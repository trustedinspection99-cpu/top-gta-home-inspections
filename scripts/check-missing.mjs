import { readFileSync, existsSync } from 'fs';

const sm = readFileSync('dist/sitemap.xml', 'utf8');
const urls = [...sm.matchAll(/<loc>https:\/\/www\.asads\.ca([^<]+)<\/loc>/g)].map(m => m[1]);
const missing = urls.filter(u => {
  const path = u === '/' ? 'dist/index.html' : 'dist' + u + '/index.html';
  return !existsSync(path);
});
const groups = {};
missing.forEach(u => {
  const parts = u.split('/').filter(Boolean);
  const key = parts.length >= 2 ? parts.slice(0,2).join('/') : parts[0] || 'root';
  groups[key] = (groups[key]||0) + 1;
});
console.log('Total missing prerender:', missing.length);
console.log('\nGrouped:');
Object.entries(groups).sort((a,b)=>b[1]-a[1]).forEach(([k,v]) => console.log('  ' + k + ': ' + v + ' pages'));
console.log('\nFirst 10 missing:');
missing.slice(0,10).forEach(u => console.log(' ', u));
