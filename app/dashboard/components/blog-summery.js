"use client";
import useAuthStore from "@/store/useAuthStore";

export default function BlogSummery() {
  const { user, token } = useAuthStore();
  return (
    <section className="flex justify-between items-center">
      <h1 className="text-4xl font-semibold">Summary</h1>
      <aside>
        <h1>Hello, {user?.username}</h1>
      </aside>
    </section>
  );
}
