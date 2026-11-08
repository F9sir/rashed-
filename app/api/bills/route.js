import { createBill } from '../../../lib/data/store';
export const runtime = 'nodejs';
export async function POST(request) { try { if (Number(request.headers.get('content-length')) > 100000) return Response.json({error:'Too large'}, {status:413}); const data=await request.json(); return Response.json(await createBill(data),{status:201,headers:{'Cache-Control':'no-store'}}); } catch { return Response.json({error:'Invalid bill'}, {status:400}); } }
