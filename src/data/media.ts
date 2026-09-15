import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import hashes from './placeholder-hashes.json';
export function isPlaceholder(path: string): boolean {
  const digest = createHash('sha256').update(readFileSync(process.cwd() + '/public' + path)).digest('hex');
  return (hashes as Record<string,string>)[path] === digest;
}
