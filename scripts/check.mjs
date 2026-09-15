import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {resolve,join} from 'node:path';
import vm from 'node:vm';
import {stripTypeScriptTypes} from 'node:module';

const pages=JSON.parse(readFileSync('src/data/pages.json','utf8'));
const assets=JSON.parse(readFileSync('src/data/assets.json','utf8'));
const read=p=>readFileSync(p,'utf8');
const pathFor=route=>join('dist',route,'index.html');
assert.equal(pages.length,11);
const linked=new Set(['/']);
for(const page of pages){
  const html=read(pathFor(page.route));
  assert.equal((html.match(/<h1\b/g)||[]).length,1,page.route+' h1');
  assert.match(html,/<html lang="en-US"/);
  assert(!/THOR-05F|\u2014|tel:|secure\.notion|amazonaws\.com|ASSET:|<unknown|<mention/.test(html),page.route+' forbidden artifact');
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
  assert.equal(ids.length,new Set(ids).size,page.route+' duplicate IDs');
  for(const match of html.matchAll(/<(?:img|video|source)\b[^>]*\bsrc="([^"]+)"[^>]*>/g)){
    assert(match[1].startsWith('/'),page.route+' local media');
    assert(existsSync('public'+match[1]),match[1]);
    if(match[0].startsWith('<img'))assert(/\balt="[^"]+"/.test(match[0]),'image alt');
  }
  for(const [,href]of html.matchAll(/\bhref="([^"]+)"/g)){
    if(!href.startsWith('/')&&!href.startsWith('#'))continue;
    const url=new URL(href,'https://patrickthangarajah.github.io'+page.route);
    if(url.pathname.endsWith('/')){
      assert(existsSync(pathFor(url.pathname)),href);linked.add(url.pathname);
      if(url.hash)assert(read(pathFor(url.pathname)).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),href+' anchor');
    }else assert(existsSync('dist'+url.pathname),href);
  }
}
assert(pages.every(p=>linked.has(p.route)),'Every page is linked');
for(const a of Object.values(assets)){
  for(const file of [a.path,a.mp4,a.poster].filter(Boolean)){
    assert(existsSync('public'+file),file);
    assert(statSync('public'+file).size<10_000_000,file+' under 10 MB');
  }
  assert(a.caption&&a.alt&&a.width>0&&a.height>0,a.id);
}
const source=read('src/components/LocalVideo.astro');
assert.match(source,/<video[^>]*muted loop playsinline preload="metadata" controls/);
assert.match(source,/poster=\{poster\}/);
const script=stripTypeScriptTypes(source.match(/<script>([\s\S]*?)<\/script>/)[1]);
let observer, plays=0, pauses=0;
const events={};const docEvents={};const motion={matches:false,addEventListener:(_,fn)=>{motion.change=fn;}};
const video={muted:false,addEventListener:(name,fn)=>events[name]=fn,play:()=>{plays++;events.play?.();return Promise.resolve();},pause:()=>{pauses++;events.pause?.();}};
const document={hidden:false,querySelectorAll:()=>[video],addEventListener:(name,fn)=>docEvents[name]=fn};
vm.runInNewContext(script,{window:{matchMedia:()=>motion},document,IntersectionObserver:class{constructor(fn){observer=fn;}observe(){}}});
assert.equal(plays,0,'No eager autoplay');observer([{isIntersecting:false}]);assert.equal(plays,0);
observer([{isIntersecting:true}]);assert.equal(plays,1,'Play on entry');assert(video.muted);
observer([{isIntersecting:false}]);assert(pauses>0,'Pause on exit');
motion.matches=true;observer([{isIntersecting:true}]);assert.equal(plays,1,'Reduced motion never autoplays');
motion.matches=false;motion.change();assert.equal(plays,2);
events.pause();observer([{isIntersecting:true}]);assert.equal(plays,2,'Respect user pause');
events.play();document.hidden=true;docEvents.visibilitychange();const n=plays;assert.equal(plays,n,'Hidden tab pauses');
const css=read('src/styles/global.css');assert.match(css,/\.local-video video\{display:none!important\}/);assert.match(css,/\.local-video \.print-poster\{display:block!important\}/);
console.log('PASS: 11 pages, local links and assets, accessible media markup, video state transitions, and print poster rules.');
