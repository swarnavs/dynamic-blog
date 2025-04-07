"use client";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import DateRangeSelect from "@/components/date-range-select";
import Input from "@/components/input";
import Label from "@/components/label";
import SubmitButton from "@/components/submit-button";
import { updateSettings } from "@/lib/actions";
import { useFormState } from "react-dom";
import useAuthStore from "@/store/useAuthStore";

const initialState = {
  message: "",
  error: false,
};

export default function SettingsForm() {
  const { user, token } = useAuthStore();
  const [state, formAction] = useFormState(updateSettings, initialState);
  return (
    <form className="space-y-4" action={formAction}>
      {state?.error && <AlertError>{state?.message}</AlertError>}
      {!state?.error && state?.message.length > 0 && (
        <AlertSuccess>{state?.message}</AlertSuccess>
      )}

      <Label htmlFor="fullName">Username</Label>
      <Input
        type="text"
        name="fullName"
        id="fullName"
        placeholder="User name"
        defaultValue={user?.username}
      />

      <SubmitButton>Update Settings</SubmitButton>
    </form>
  );
}
