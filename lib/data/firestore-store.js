import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createHash, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { calculateBill } from '../bill.js';
import { validate } from './validate.js';
function database() {
 const config=process.env.FIREBASE_SERVICE_ACCOUNT;
 if(!config) throw new Error('FIREBASE_SERVICE_ACCOUNT is not configured');
 const app=getApps()[0] || initializeApp({credential:cert(JSON.parse(config))});
 return getFirestore(app);
}
const token=()=>randomBytes(32).toString('base64url');
const digest=value=>createHash('sha256').update(value).digest('hex');
function match(input,hash){if(typeof input!=='string'||!hash)return false;const a=Buffer.from(digest(input)),b=Buffer.from(hash);return a.length===b.length&&timingSafeEqual(a,b)}
const ref=id=>database().collection('bills').doc(id);
export async function createBill(input){const {bill}=validate(input);const id=randomUUID(),owner=token(),version=Date.now();await ref(id).create({ownerHash:digest(owner),shareHash:null,shareExpires:null,bill,version});return{id,owner,version}}
export async function getBill(id,credential){const snap=await ref(id).get();if(!snap.exists)return null;const row=snap.data(),owner=match(credential,row.ownerHash),shared=match(credential,row.shareHash)&&row.shareExpires>Date.now();if(!owner&&!shared)return null;return{bill:row.bill,result:calculateBill(row.bill),role:owner?'owner':'viewer',shareExpires:owner?row.shareExpires:null,version:row.version}}
export async function updateBill(id,credential,input,version){const {bill}=validate(input),doc=ref(id);return database().runTransaction(async tx=>{const snap=await tx.get(doc);if(!snap.exists||!match(credential,snap.data().ownerHash))return null;const row=snap.data();if(row.version!==version)return false;tx.update(doc,{bill,version:version+1});return{version:version+1}})}
export async function createShare(id,credential){const doc=ref(id);return database().runTransaction(async tx=>{const snap=await tx.get(doc);if(!snap.exists||!match(credential,snap.data().ownerHash))return null;const share=token(),expires=Date.now()+7*86400000;tx.update(doc,{shareHash:digest(share),shareExpires:expires});return{share,expires}})}
export async function revokeShare(id,credential){const doc=ref(id);return database().runTransaction(async tx=>{const snap=await tx.get(doc);if(!snap.exists||!match(credential,snap.data().ownerHash))return false;tx.update(doc,{shareHash:null,shareExpires:null});return true})}
export async function joinBill(id,credential,name){if(typeof name!=='string'||!name.trim()||name.trim().length>100)throw new Error('invalid');const doc=ref(id);return database().runTransaction(async tx=>{const snap=await tx.get(doc);if(!snap.exists)return null;const row=snap.data();if(!match(credential,row.shareHash)||row.shareExpires<=Date.now())return null;const bill=row.bill;bill.people.push({id:randomUUID(),name:name.trim()});validate(bill);tx.update(doc,{bill,version:row.version+1});return{bill,result:calculateBill(bill),role:'viewer'}})}
