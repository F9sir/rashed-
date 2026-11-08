import { calculateBill } from '../bill.js';
export function validate(b) {
 if (!b || typeof b !== 'object' || !Array.isArray(b.people) || b.people.length > 50 || !Array.isArray(b.items) || b.items.length > 200 || !['equal','items'].includes(b.mode) || typeof b.name !== 'string' || b.name.length > 120 || typeof b.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(b.date) || !b.adjustments || typeof b.adjustments !== 'object' || Object.keys(b.adjustments).some(k=>!['tax','service','tip','discount'].includes(k))) throw new Error('invalid');
 if (b.people.some(p=>!p || typeof p.id !== 'string' || !p.id || p.id.length>100 || typeof p.name !== 'string' || p.name.length>100) || b.items.some(i=>!i || typeof i.name !== 'string' || i.name.length>120 || !Array.isArray(i.assigned) || i.assigned.some(id=>!b.people.some(p=>p.id===id)) || new Set(i.assigned).size!==i.assigned.length)) throw new Error('invalid');
 const result = calculateBill(b);
 return { bill: {name:b.name,date:b.date,people:b.people.map(({id,name})=>({id,name})),payer:b.payer,mode:b.mode,total:b.total,items:b.items.map(({id,name,price,assigned})=>({id,name,price,assigned})),adjustments:b.adjustments}, result };
}
