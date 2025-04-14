import { fetchPostList } from "@/lib/api/post";
import TransactionList from "./post-list";
import useAuthStore from "@/store/useAuthStore";

export default async function TransactionListWrapper() {
  const { token } = useAuthStore();
  const response = await fetchPostList(token);
  return <TransactionList initialTransactions={response.data.post} />;
}
