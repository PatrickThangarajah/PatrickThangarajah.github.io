import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

export const prerender = true;

// Build a separate sharing image without cropping or changing the source figure.
export const GET: APIRoute = async () => {
  const source = await readFile('public/figures/thor-5f/thor5f-study-overview-pdf.png');
  const figure = await sharp(source)
    .resize({ width: 1040, height: 510, fit: 'inside', withoutEnlargement: true })
    .toBuffer();
  const preview = await sharp({
    create: { width: 1200, height: 630, channels: 3, background: '#ffffff' },
  }).composite([{ input: figure, gravity: 'centre' }]).png().toBuffer();
  return new Response(new Uint8Array(preview), {
    headers: { 'Content-Type': 'image/png' },
  });
};
