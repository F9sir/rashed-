const getStore = () => { if (process.env.MAIDA_STORAGE === 'disabled') throw new Error('Storage is disabled'); return process.env.MAIDA_STORAGE === 'firestore' ? import('./firestore-store.js') : import('./sqlite-store.js'); };
export async function createBill(...args) { return (await getStore()).createBill(...args); }
export async function getBill(...args) { return (await getStore()).getBill(...args); }
export async function updateBill(...args) { return (await getStore()).updateBill(...args); }
export async function createShare(...args) { return (await getStore()).createShare(...args); }
export async function revokeShare(...args) { return (await getStore()).revokeShare(...args); }
export async function joinBill(...args) { return (await getStore()).joinBill(...args); }
