import test from 'node:test';
import assert from 'node:assert/strict';
import { parseMoney, calculateBill } from '../lib/bill.js';
const people = [{id:'a',name:'A'},{id:'b',name:'B'},{id:'c',name:'C'}];
const base = { people, payer:'a', mode:'equal', total:'1.000', items:[], adjustments:{} };
test('parses exact fils and Arabic numerals',()=>{assert.equal(parseMoney('١.٠٢٥'),1025);assert.equal(parseMoney('1.0001'),null)});
test('splits remainder deterministically',()=>{const x=calculateBill(base);assert.deepEqual(x.shares,{a:334,b:333,c:333});assert.equal(x.total,1000)});
test('splits shared items and adjustments',()=>{const x=calculateBill({...base,mode:'items',items:[{name:'Tea',price:'1.001',assigned:['a','b']},{name:'Food',price:'2.000',assigned:['c']}],adjustments:{tax:'0.002',discount:'0.001'}});assert.equal(Object.values(x.shares).reduce((a,b)=>a+b,0),3002);assert.deepEqual(x.shares,{a:501,b:501,c:2000})});
test('rejects unassigned items and negative shares',()=>{assert.throws(()=>calculateBill({...base,mode:'items',items:[{name:'Tea',price:'1',assigned:[]}]}));assert.throws(()=>calculateBill({...base,adjustments:{discount:'2'}}))});
