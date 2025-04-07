"use client";

import { signOut } from "@/lib/actions";
import SubmitButton from "./submit-button";
import { LogOut } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const { clearAuthData } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(); // server-side cookie removal
    } catch (error) {
      console.error("Logout failed:", error);
    }

    clearAuthData(); // clear local state + localStorage
    // router.push("/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center gap-2 text-sm text-gray-700 hover:text-red-600"
    >
      <LogOut className="w-6 h-6" />
      Logout
    </button>
  );
}
