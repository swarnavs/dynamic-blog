"use client";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import DateRangeSelect from "@/components/date-range-select";
import Input from "@/components/input";
import Label from "@/components/label";
import SubmitButton from "@/components/submit-button";
import { updateProfile } from "@/lib/actions";
import { useFormState } from "react-dom";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";

const initialState = {
  message: "",
  error: false,
};

export default function SettingsForm() {
  const { user, setAuthData } = useAuthStore();
  const [state, formAction] = useFormState(updateProfile, initialState);

  useEffect(() => {
    if (!state.error && state?.data?.username) {
      setAuthData({
        user: { username: state?.data?.username },
      });
    }
  }, [state, setAuthData]);
  return (
    <form className="space-y-4" action={formAction}>
      {state?.error && <AlertError>{state?.message}</AlertError>}
      {!state?.error && state?.message.length > 0 && (
        <AlertSuccess>{state?.message}</AlertSuccess>
      )}

      <Label htmlFor="fullname">Username</Label>
      <Input
        type="text"
        name="username"
        id="fullName"
        placeholder="User name"
        defaultValue={user?.username}
      />

      <SubmitButton>Update Settings</SubmitButton>
    </form>
  );
}
