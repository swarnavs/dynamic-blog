import SignupForm from "./components/signup-form";

export default function Page() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] py-40">
      <div className="flex flex-col space-y-8 text-center">
        <h1 className="text-2xl font-semibold">Welcome Dear</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Create your account and verify it.
        </p>
      </div>
      <SignupForm />
    </div>
  );
}
