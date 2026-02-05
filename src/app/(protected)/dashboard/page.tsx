import { requireAuthSession } from "@/features/auth/guards";
import { Dashboard } from "@/components/dashboard/pages/dashboard";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  try {
    await requireAuthSession();
  } catch {
    const redirectUrl = new URL("/login", process.env.NEXT_PUBLIC_BASE_URL);
    redirectUrl.searchParams.set("redirect", "/dashboard");
    redirect(redirectUrl.toString());
    return null;
  }

  return <Dashboard />;
}
