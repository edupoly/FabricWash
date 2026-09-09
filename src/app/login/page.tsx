"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {LockKeyhole,Mail,Shirt} from "lucide-react";

export default function Login(){
  const router=useRouter();const[email,setEmail]=useState("");const[password,setPassword]=useState("");const[error,setError]=useState("");const[loading,setLoading]=useState(false);
  const submit=async(event:React.FormEvent)=>{event.preventDefault();setLoading(true);setError("");const response=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});setLoading(false);if(!response.ok){setError("Invalid email or password.");return}router.push("/");router.refresh()};
  return <main className="login-page"><section className="login-card"><div className="login-logo"><span><Shirt/></span><div><b>Fabric Wash</b><small>Fresh Clothes | Happy You</small></div></div><div className="login-heading"><h1>Welcome back</h1><p>Sign in to manage laundry billing and customers.</p></div><form onSubmit={submit}><label>Email address<div><Mail/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@fabricwash.com" autoComplete="username" required/></div></label><label>Password<div><LockKeyhole/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" required/></div></label>{error&&<p className="login-error">{error}</p>}<button className="primary" disabled={loading}>{loading?"Signing in…":"Sign in"}</button></form><small className="login-security">Protected administrator access</small></section></main>;
}
