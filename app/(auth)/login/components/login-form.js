"use client";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { login } from "@/lib/actions";
import { useFormState } from "react-dom";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  message: "",
  error: false,
};

export default function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);
  const { setAuthData } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (state && state.token && state.user) {
      setAuthData({ token: state.token, user: state.user });
      router.push("/dashboard");
    }
  }, [state, setAuthData, router]);
  return (
    <form action={formAction} className="space-y-2">
      <Input
        type="email"
        placeholder="name@example.com"
        name="email"
        required
      />
      <Input
        type="password"
        placeholder="Enter your password"
        name="password"
        required
      />
      <SubmitButton type="submit" size="sm" className="w-full">
        Sign in
      </SubmitButton>
      <p
        className={`${
          state?.error ? "text-red-500" : "text-green-500"
        } text-sm text-center`}
      >
        {state?.message}
      </p>
    </form>
  );
}
