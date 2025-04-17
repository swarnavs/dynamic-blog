import Comments from "../../../components/comments";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { postDetails } from "@/lib/api/post";

export default async function Page({ params: { id } }) {
  const token = cookies().get("auth-token")?.value ?? null;
  const { data, error } = await postDetails(id, token);

  if (error) notFound();

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Blog Details</h1>
      <Comments initialData={data.post} />
    </>
  );
}
