import { marked } from 'marked';
const escape = (s:string) => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
export function render(text: string, label: string) {
  let tableIndex = 0;
  text = text.replace(/<table\b[^>]*>[\s\S]*?<\/table>/g, source => {
    const rows = [...source.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(row => [...row[1].matchAll(/<td>([\s\S]*?)<\/td>/g)].map(c=>c[1].trim()));
    if (!rows.length) return '';
    const numeric = (s:string) => /^-?\d+(?:\.\d+)?$/.test(s);
    const cell = (s:string) => {
      if (!numeric(s)) return marked.parseInline(s);
      const [integer, fraction] = s.split('.');
      return `<span class="decimal"><span>${integer}</span><span>${fraction === undefined ? '' : '.'+fraction}</span></span>`;
    };
    tableIndex++;
    return `<div class="wide-content" role="region" tabindex="0" aria-label="${escape(label)} table ${tableIndex}"><table><thead><tr>${rows[0].map(s=>`<th scope="col">${marked.parseInline(s)}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(row=>`<tr>${row.map((s,i)=>i===0?`<th scope="row">${cell(s)}</th>`:`<td${numeric(s)?' class="numeric"':''}>${cell(s)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>\n\n`;
  });
  let output = marked.parse(text, {gfm:true}) as string;
  output = output.replace(/<pre>/g, `<pre tabindex="0" aria-label="${escape(label)} code excerpt">`);
  // Extract existing numeric emphasis without changing its surrounding sentence.
  // Colon-led labels become separate metadata elements, with their words retained.
  output = output.replace(/<(p|li)>([\s\S]*?)<\/\1>/g, (whole, tag, body) => {
    const values=[...body.matchAll(/<strong>([^<]+)<\/strong>/g)].map(m=>m[1]).filter(value=>/^(?:[<>~≈]\s*)?\d/.test(value));
    let cleaned=body.replace(/^<strong>([^<]+:)<\/strong>\s*/, '<span class="prose-label">$1</span>');
    cleaned=cleaned.replace(/<strong>([\s\S]*?)<\/strong>/g,'$1');
    const metrics=values.length?`<span class="prose-metrics">${[...new Set(values)].map(value=>`<span>${value}</span>`).join('')}</span>`:'';
    return `<${tag}>${metrics}${cleaned}</${tag}>`;
  });
  return output;
}
