import { requireAuthSession } from "@features/auth/guards";
import UnauthorizedPage from "@components/navigation/pages/unauthorized";

export default async function TestPage() {
  try {
    await requireAuthSession();
  } catch {
    return <UnauthorizedPage />;
  }
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col px-32 py-16 gap-6 justify-center items-center">
      <h1 className="text-white text-5xl font-bold">
        Hello, <span className="text-blue-500">Test Page!</span>
      </h1>
      <div className="text-white text-3xl font-medium">
        This is an{" "}
        <span className="text-red-500 underline">admin-only page</span>
      </div>
    </div>
  );
}
