export function parseMoney(value) {
  const normalized = String(value ?? '').trim().replace(/[٠-٩]/g, c => '٠١٢٣٤٥٦٧٨٩'.indexOf(c)).replace(/[٫]/g, '.');
  if (!/^\d+(?:\.\d{0,3})?$/.test(normalized)) return null;
  const [whole, fraction = ''] = normalized.split('.');
  const amount = Number(whole) * 1000 + Number((fraction + '000').slice(0, 3));
  return Number.isSafeInteger(amount) ? amount : null;
}
export function formatMoney(value) { return `${Math.floor(value / 1000)}.${String(value % 1000).padStart(3, '0')}`; }
function distribute(amount, ids, shares) {
  const base = Math.floor(amount / ids.length), remainder = amount % ids.length;
  ids.forEach((id, index) => { shares[id] += base + (index < remainder ? 1 : 0); });
}
export function calculateBill({ people, payer, mode, total, items, adjustments }) {
  if (!people.length || people.some(p => !p.name.trim()) || new Set(people.map(p => p.id)).size !== people.length) throw new Error('people');
  if (!people.some(p => p.id === payer)) throw new Error('payer');
  const ids = people.map(p => p.id), shares = Object.fromEntries(ids.map(id => [id, 0]));
  let subtotal = 0;
  if (mode === 'equal') {
    subtotal = parseMoney(total); if (subtotal === null || subtotal <= 0) throw new Error('total');
    distribute(subtotal, ids, shares);
  } else {
    if (!items.length) throw new Error('items');
    for (const item of items) {
      const amount = parseMoney(item.price);
      if (!item.name.trim() || amount === null || amount <= 0) throw new Error('item');
      const assigned = ids.filter(id => item.assigned.includes(id));
      if (!assigned.length) throw new Error('assignment');
      subtotal += amount; distribute(amount, assigned, shares);
    }
  }
  let final = subtotal;
  for (const [key, raw] of Object.entries(adjustments)) {
    const amount = raw === '' ? 0 : parseMoney(raw);
    if (amount === null) throw new Error('adjustment');
    const allocated = Object.fromEntries(ids.map(id => [id, 0])); distribute(amount, ids, allocated);
    for (const id of ids) shares[id] += (key === 'discount' ? -1 : 1) * allocated[id];
    final += (key === 'discount' ? -1 : 1) * amount;
  }
  if (final < 0 || ids.some(id => shares[id] < 0)) throw new Error('discount');
  return { subtotal, total: final, shares };
}
