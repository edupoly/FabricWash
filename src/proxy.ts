import {NextRequest,NextResponse} from "next/server";
import {verifySessionToken} from "@/lib/auth";
export async function proxy(request:NextRequest){const valid=await verifySessionToken(request.cookies.get("fabric_session")?.value);const isLogin=request.nextUrl.pathname==="/login";if(!valid&&!isLogin)return NextResponse.redirect(new URL("/login",request.url));if(valid&&isLogin)return NextResponse.redirect(new URL("/",request.url));return NextResponse.next()}
export const config={matcher:["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"]};
