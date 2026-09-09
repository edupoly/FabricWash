import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Invoice } from "@/models/Invoice";

export async function GET(){try{await connectDB();const invoices=await Invoice.find().sort({createdAt:-1}).limit(100).lean();return NextResponse.json(invoices)}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Unable to load invoices"},{status:503})}}
export async function POST(request:Request){try{const body=await request.json();if(!body.customer?.name||!body.customer?.phone||!Array.isArray(body.items)||!body.items.length)return NextResponse.json({error:"Customer and services are required"},{status:400});await connectDB();const last=await Invoice.findOne().sort({createdAt:-1}).select("invoiceNumber").lean<{invoiceNumber:string}>();const next=Math.max(1,Number(last?.invoiceNumber?.replace(/\D/g, "")||0)+1);const invoice=await Invoice.create({...body,invoiceNumber:`FW${String(next).padStart(6,"0")}`});return NextResponse.json(invoice,{status:201})}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Unable to create invoice"},{status:500})}}
