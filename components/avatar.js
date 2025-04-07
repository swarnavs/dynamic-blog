"use client";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import useAuthStore from "@/store/useAuthStore";

export default function Avatar({ width = 32, height = 32 }) {
  const { user, token } = useAuthStore();

  if (!user) {
    return <CircleUser className="w-6 h-6" />;
  }

  return (
    <Image
      src={user?.profile_pic_url}
      width={width}
      height={height}
      alt="User avatar"
      className="rounded-full"
    />
  );
}
