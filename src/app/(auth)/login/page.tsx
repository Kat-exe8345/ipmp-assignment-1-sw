import { LoginForm } from "@/components/auth/loginform";

export default function Login() {
  return (
    <div className="mt-20 bg-zinc-50 dark:bg-black w-full flex items-center justify-center font-sans">
      <main className="flex flex-col justify-center items-center w-full max-w-md px-4 sm:px-6 bg-white dark:bg-zinc-950 rounded-lg">
        <LoginForm />
      </main>
    </div>
  );
}
