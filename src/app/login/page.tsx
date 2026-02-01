import { LoginForm } from "@/components/auth/loginform";

export default function Login() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black w-full h-full flex items-center justify-center font-sans">
      <main className="flex flex-col justify-center items-center w-full min-h-screen max-w-3xl py-32 px-16 bg-white dark:bg-black">
        <LoginForm />
      </main>
    </div>
  );
}
