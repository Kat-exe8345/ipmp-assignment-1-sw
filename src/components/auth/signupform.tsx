/** biome-ignore-all lint/correctness/noChildrenProp: Using tanstack forms */
"use client";

import { signupSchema } from "@features/auth/validators";
import { useForm } from "@tanstack/react-form-nextjs";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });
        const data = await res.json();
        console.log(data);

        if (!res.ok || !data.ok) {
          form.setErrorMap({
            onSubmit: data.message || "An error occurred",
          });
          throw new Error(data.message || "An error occurred");
        }

        router.push("/");
        router.refresh();
      } catch (_error) {
        return null;
      }
    },
    validators: {
      onChangeAsyncDebounceMs: 500,
      onChangeAsync: signupSchema,
      onSubmit: ({ value }) => {
        if (!value.name || !value.email || !value.password) {
          return "Please fill all the fields";
        }
        return undefined;
      },
    },
  });

  return (
    <form
      className="w-full max-w-md mx-auto p-8 bg-linear-to-br from-gray-950 to-gray-900 rounded-lg shadow-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Sign Up
      </h1>

      <form.Field
        name="name"
        children={(field) => (
          <div className="mb-6">
            <label
              htmlFor="name"
              className="text-white font-semibold text-sm block mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition"
              placeholder="John Doe"
            />
            {!field.state.meta.isValid && (
              <em className="text-red-400 text-sm mt-1 block">
                {field.state.meta.errors[0]?.message}
              </em>
            )}
          </div>
        )}
      />

      <form.Field
        name="email"
        children={(field) => (
          <div className="mb-6">
            <label
              htmlFor="email"
              className="text-white font-semibold text-sm block mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition"
              placeholder="you@example.com"
            />
            {!field.state.meta.isValid && (
              <em className="text-red-400 text-sm mt-1 block">
                {field.state.meta.errors[0]?.message}
              </em>
            )}
          </div>
        )}
      />

      <form.Field
        name="password"
        children={(field) => (
          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-white font-semibold text-sm block mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition"
              placeholder="••••••••"
            />
            {!field.state.meta.isValid && (
              <em className="text-red-400 text-sm mt-1 block">
                {field.state.meta.errors[0]?.message}
              </em>
            )}
          </div>
        )}
      />

      <form.Subscribe
        selector={(state) => [state.errorMap]}
        children={([errorMap]) =>
          errorMap.onSubmit ? (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-400 rounded-md text-sm">
              {errorMap.onSubmit}
            </div>
          ) : null
        }
      />

      <button
        type="submit"
        className="w-full bg-linear-to-r from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        disabled={form.state.isSubmitting}
      >
        {form.state.isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⏳</span> Creating account...
          </span>
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
}
