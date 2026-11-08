import { getBill, updateBill, createShare, revokeShare } from '../../../../lib/data/store';
export const runtime = 'nodejs';
const credential = request => request.headers.get('authorization')?.replace(/^Bearer /,'') || '';
const missing = () => Response.json({error:'Bill unavailable or access denied'}, {status:404,headers:{'Cache-Control':'no-store'}});
export async function GET(request,{params}) { const {id}=await params; const result=await getBill(id,credential(request)); return result ? Response.json(result,{headers:{'Cache-Control':'no-store'}}) : missing(); }
export async function PUT(request,{params}) { try { const {id}=await params; if(Number(request.headers.get('content-length'))>100000) return Response.json({error:'Too large'},{status:413}); const body=await request.json();const result=await updateBill(id,credential(request),body.bill,body.version); return result ? Response.json(result) : result===false ? Response.json({error:'Bill changed; reopen it before saving'}, {status:409}) : missing(); } catch {return Response.json({error:'Invalid bill'},{status:400});} }
export async function POST(request,{params}) { const {id}=await params; const share=await createShare(id,credential(request)); return share ? Response.json(share,{headers:{'Cache-Control':'no-store'}}):missing(); }
export async function DELETE(request,{params}) { const {id}=await params; return await revokeShare(id,credential(request)) ? Response.json({ok:true}) : missing(); }
