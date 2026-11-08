import { DatabaseSync } from 'node:sqlite';
import { createHash, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { calculateBill } from '../bill.js';
import { validate } from './validate.js';

const path = process.env.MAIDA_DATA_DIR || join(process.cwd(), '.data');
mkdirSync(path, { recursive: true });
const db = new DatabaseSync(join(path, 'maida.sqlite'));
db.exec(`CREATE TABLE IF NOT EXISTS bills (id TEXT PRIMARY KEY, owner_hash TEXT NOT NULL, share_hash TEXT, share_expires INTEGER, data TEXT NOT NULL, updated INTEGER NOT NULL)`);
const digest = token => createHash('sha256').update(token).digest('hex');
const token = () => randomBytes(32).toString('base64url');
function match(input, hash) { if (typeof input !== 'string' || !hash) return false; const a=Buffer.from(digest(input)), b=Buffer.from(hash); return a.length===b.length && timingSafeEqual(a,b); }
export function createBill(input) { const {bill}=validate(input); const id=randomUUID(), owner=token(), version=Date.now(); db.prepare('INSERT INTO bills VALUES (?, ?, NULL, NULL, ?, ?)').run(id,digest(owner),JSON.stringify(bill),version); return {id,owner,version}; }
export function getBill(id, credential) { const row=db.prepare('SELECT * FROM bills WHERE id=?').get(id); if(!row) return null; const owner=match(credential,row.owner_hash); const shared=match(credential,row.share_hash) && row.share_expires>Date.now(); if(!owner && !shared) return null; const bill=JSON.parse(row.data); return {bill,result:calculateBill(bill),role:owner?'owner':'viewer', shareExpires:owner?row.share_expires:null,version:row.updated}; }
export function updateBill(id, credential, input, version) { const row=db.prepare('SELECT owner_hash FROM bills WHERE id=?').get(id); if(!row || !match(credential,row.owner_hash)) return null; const {bill}=validate(input); const result=db.prepare('UPDATE bills SET data=?, updated=updated+1 WHERE id=? AND updated=?').run(JSON.stringify(bill),id,version); return result.changes ? {version:version+1} : false; }
export function createShare(id, credential) { const row=db.prepare('SELECT owner_hash FROM bills WHERE id=?').get(id); if(!row || !match(credential,row.owner_hash)) return null; const share=token(), expires=Date.now()+7*86400000; db.prepare('UPDATE bills SET share_hash=?,share_expires=? WHERE id=?').run(digest(share),expires,id); return {share,expires}; }
export function revokeShare(id, credential) { const row=db.prepare('SELECT owner_hash FROM bills WHERE id=?').get(id); if(!row || !match(credential,row.owner_hash)) return false; db.prepare('UPDATE bills SET share_hash=NULL,share_expires=NULL WHERE id=?').run(id); return true; }
export function joinBill(id, credential, name) {
 const row=db.prepare('SELECT * FROM bills WHERE id=?').get(id);
 if(!row || !match(credential,row.share_hash) || row.share_expires<=Date.now()) return null;
 if(typeof name!=='string' || !name.trim() || name.trim().length>100) throw new Error('invalid');
 const bill=JSON.parse(row.data); bill.people.push({id:randomUUID(),name:name.trim()});
 validate(bill);
 db.prepare('UPDATE bills SET data=?,updated=updated+1 WHERE id=?').run(JSON.stringify(bill),id);
 return {bill,result:calculateBill(bill),role:'viewer'};
}
