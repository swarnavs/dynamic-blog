"use client";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { uploadAvatar } from "@/lib/actions";
import { useFormState } from "react-dom";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";

const initialState = {
  message: "",
  error: false,
};

export default function Page() {
  const [state, formAction] = useFormState(uploadAvatar, initialState);
  const { setAuthData } = useAuthStore();

  useEffect(() => {
    if (!state.error && state?.data?.profile_pic_url) {
      setAuthData({
        user: { profile_pic_url: state?.data?.profile_pic_url },
      });
    }
  }, [state, setAuthData]);
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Avatar</h1>
      <form className="space-y-4" action={formAction}>
        {state?.error && <AlertError>{state?.message}</AlertError>}
        {!state?.error && state?.message.length > 0 && (
          <AlertSuccess>{state?.message}</AlertSuccess>
        )}
        <Input type="file" name="file" id="file" />
        <SubmitButton>Upload Avatar</SubmitButton>
      </form>
    </>
  );
}
