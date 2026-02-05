import type { Metadata } from "next";
import { getSession } from "@/features/auth/service";
import { getDBUserById } from "@/features/users/user.repo";
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

  // Get user name if authenticated
  let userName = "User";
  if (isAuthenticated && session?.userId) {
    try {
      const user = await getDBUserById(session.userId);
      if (user) {
        userName = user.name?.split(" ")[0] || "User"; // Get first name
      }
    } catch {
      userName = "User";
    }
  }

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} userName={userName} />
      {children}
    </>
  );
}
