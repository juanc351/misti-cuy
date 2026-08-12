import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getAdminSession } from "@/lib/auth-session";
import AdminLayoutClient from "./AdminLayoutClient";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  const session =
    await getAdminSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
  );
}