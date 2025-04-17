import TransactionList from "./post-list";
import { fetchPost } from "@/lib/actions";

export default async function TransactionListWrapper() {
  const response = await fetchPost();
  const posts = response?.data?.post || [];
  return <TransactionList initialTransactions={posts} />;
}
