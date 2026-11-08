import { joinBill } from '../../../../../lib/data/store';
export const runtime='nodejs';
export async function POST(request,{params}) {try{const {id}=await params;const token=request.headers.get('authorization')?.replace(/^Bearer /,'')||'';const {name}=await request.json();const result=await joinBill(id,token,name);return result?Response.json(result,{headers:{'Cache-Control':'no-store'}}):Response.json({error:'Unavailable'},{status:404});}catch{return Response.json({error:'Unable to join bill'},{status:400})}}
