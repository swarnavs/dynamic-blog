"use client";
import { KeyRound } from "lucide-react";
import { sizes, variants } from "@/lib/variants";
import SignOutButton from "./sign-out-button";
import Avatar from "./avatar";
import Link from "next/link";
import useAuthStore from "@/store/useAuthStore";

export default function UserInfo() {
  const { user, token } = useAuthStore();

  if (user) {
    return (
      <>
        <Link
          href="/dashboard/settings"
          className={`flex items-center space-x-1 ${variants["ghost"]} ${sizes["sm"]}`}
        >
          <Avatar />
          <span>{user?.username ?? user?.email}</span>
        </Link>
        <SignOutButton />
      </>
    );
  }

  return (
    <>
      <Link
        href="/signup"
        className={`flex items-center space-x-1 ${variants["ghost"]} ${sizes["sm"]}`}
      >
        <Avatar />
        <span>Signup</span>
      </Link>
      <Link href="/login" className={`${variants["ghost"]} ${sizes["sm"]}`}>
        <KeyRound className="w-6 h-6" />
      </Link>
    </>
  );
}
