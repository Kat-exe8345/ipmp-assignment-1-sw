import { requireAuthSession } from "@features/auth/guards";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  try {
    await requireAuthSession();
  } catch {
    const url = new URL("/login", process.env.NEXT_PUBLIC_BASE_URL);
    url.searchParams.set("redirect", "/profile");
    redirect(url.toString());
    return null;
  }
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col px-32 py-16 gap-6 justify-center items-center">
      <h1 className="text-white text-5xl font-bold">
        Hello, <span className="text-blue-500">Profile!</span>
      </h1>
      <div className="text-white text-3xl font-medium">
        This is a <span className="text-red-500 underline">protected page</span>
      </div>
    </div>
  );
}
