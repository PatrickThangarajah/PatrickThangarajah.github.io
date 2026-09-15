import http from 'node:http';
import {readFileSync, existsSync, mkdirSync, writeFileSync} from 'node:fs';
import {resolve, extname} from 'node:path';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import {launch} from 'chrome-launcher';

const root=resolve('dist');
let currentMode='light';
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webm':'video/webm','.mp4':'video/mp4','.pdf':'application/pdf'};
const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=resolve(root,'.'+pathname+(pathname.endsWith('/')?'index.html':''));
  if(!file.startsWith(root+'/') || !existsSync(file)){res.writeHead(404);res.end('Not found');return;}
  res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream'});
  // Seed the same saved preference used by the theme button, only in the audit server.
  const content=readFileSync(file);
  res.end(extname(file)==='.html'?content.toString().replace('<head>',`<head><script>localStorage.setItem('theme','${currentMode}')</script>`):content);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=`http://127.0.0.1:${server.address().port}`;
const pages=JSON.parse(readFileSync('src/data/pages.json','utf8')).filter(p=>!process.env.AUDIT_ROUTES||process.env.AUDIT_ROUTES.split(',').includes(p.route));
const width=Number(process.env.AUDIT_WIDTH||390);
const performance=process.env.AUDIT_PERFORMANCE!=='0';
const output=process.env.AUDIT_OUTPUT||'test-results';mkdirSync(output,{recursive:true});
const results=[];
try{
  for(const mode of ['light','dark']){
    currentMode=mode;
    const chrome=await launch({chromePath:process.env.CHROME_PATH,chromeFlags:['--headless','--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader',...(mode==='dark'?['--force-dark-mode']:[])]});
    try{
      for(const page of pages){
        const result=await lighthouse(base+page.route,{port:chrome.port,onlyCategories:['accessibility','best-practices',...(performance?['performance']:[])],logLevel:'error',output:'json',formFactor:width>=1000?'desktop':'mobile',screenEmulation:{mobile:width<1000,width,height:844,deviceScaleFactor:1,disabled:false}},width>=1000?desktopConfig:undefined);
        const {lhr}=result;
        const failed=Object.values(lhr.audits).filter(a=>a.score!==null&&a.score<1).map(a=>({id:a.id,title:a.title,score:a.score,details:a.details}));
        const record={route:page.route,mode,performance:lhr.categories.performance?.score*100,accessibility:lhr.categories.accessibility.score*100,bestPractices:lhr.categories['best-practices'].score*100,contrast:lhr.audits['color-contrast']?.score,layoutShift:lhr.audits['cumulative-layout-shift']?.numericValue,failed};
        results.push(record);console.log(JSON.stringify({...record,failed:failed.map(a=>a.id)}));
        writeFileSync(`${output}/${page.slug||'hub'}-${mode}.json`,JSON.stringify(lhr));
      }
    }finally{await chrome.kill();}
  }
}finally{server.close();writeFileSync(`${output}/summary.json`,JSON.stringify(results,null,2));}
if(results.length!==pages.length*2||results.some(r=>r.accessibility<=95||r.bestPractices<=95||(performance&&r.performance<=90)))process.exitCode=1;
