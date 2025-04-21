export const dynamic = "force-dynamic";
import TransactionList from "./post-list";
import { fetchPostList } from "@/lib/api/post";
import { cookies } from "next/headers";

export default async function TransactionListWrapper() {
  const token = cookies().get("auth-token")?.value ?? null;
  const response = await fetchPostList(token);
  const posts = response?.data;
  return <TransactionList initialTransactions={posts} />;
}
