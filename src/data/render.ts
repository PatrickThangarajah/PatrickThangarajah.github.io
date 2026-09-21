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
  // Keep authored emphasis in place. Colon-led labels may be styled as metadata,
  // but numeric values are never promoted into standalone metric chips automatically.
  output = output.replace(/<(p|li)>([\s\S]*?)<\/\1>/g, (whole, tag, body) => {
    const cleaned=body.replace(/^<strong>([^<]+:)<\/strong>\s*/, '<span class="prose-label">$1</span> ');
    return `<${tag}>${cleaned}</${tag}>`;
  });
  return output;
}
