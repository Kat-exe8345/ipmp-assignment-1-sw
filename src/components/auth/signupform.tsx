export function SignupForm() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 w-full text-center">Sign Up</h1>
      <form className="flex flex-col justify-between items-center">
        <label
          htmlFor="name"
          className="text-white mb-2 font-medium text-lg w-full px-2"
        >
          Name
        </label>
        <input
          type="text"
          placeholder="Example: John Doe"
          className="border-2 p-4 rounded-md mb-6 w-lg focus:ring-0 focus:outline-none"
        />
        <label
          htmlFor="email"
          className="text-white mb-2 font-medium text-lg w-full px-2"
        >
          Email
        </label>
        <input
          type="email"
          placeholder="Example: user@example.com"
          className="border-2 p-4 rounded-md mb-6 w-lg focus:ring-0 focus:outline-none"
        />
        <label
          htmlFor="password"
          className="text-white mb-2 font-medium text-lg w-full px-2"
        >
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          className="border-2 p-4 rounded-md mb-6 w-lg focus:ring-0 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-4 rounded w-lg"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
