import type { Metadata } from "next";
import { getSession } from "@/features/auth/service";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navigation/navbar";

export const metadata: Metadata = {
  title: "TaskFlow - Task Management Made Simple",
  description:
    "Organize your tasks, amplify your productivity with TaskFlow - the all-in-one task management solution.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const isAuthenticated = !!session;

  if (isAuthenticated && session?.userId) {
    redirect("/dashboard");
  }

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      {children}
    </>
  );
}
