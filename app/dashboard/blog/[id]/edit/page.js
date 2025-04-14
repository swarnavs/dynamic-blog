"use client";
import Comments from "@/app/dashboard/components/comments";
import { notFound } from "next/navigation";
import { postDetails } from "@/lib/api/post";
import useAuthStore from "@/store/useAuthStore";

export default async function Page({ params: { id } }) {
  const { token } = useAuthStore();
  const { data, error } = await postDetails(id, token);

  console.log("response", data);

  if (error) notFound();

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Blog Details</h1>
      {/* <Comments initialData={data.post} /> */}
    </>
  );
}
