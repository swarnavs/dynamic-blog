"use client";

import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { signup } from "@/lib/actions"; // you need to define this function
import { useFormState } from "react-dom";

const initialState = {
  message: "",
  error: false,
};

export default function SignupForm() {
  const [state, formAction] = useFormState(signup, initialState);

  return (
    <form action={formAction} className="space-y-2">
      <Input
        type="email"
        placeholder="name@example.com"
        name="email"
        required
      />
      <Input
        type="text"
        placeholder="Choose a username"
        name="username"
        required
      />
      <Input
        type="password"
        placeholder="Enter your password"
        name="password"
        required
      />
      <SubmitButton type="submit" size="sm" className="w-full">
        Create Account
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
