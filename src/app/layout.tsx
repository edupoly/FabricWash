import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Fabric Wash | Laundry Billing", description: "Create and manage professional laundry invoices with Fabric Wash." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
