import TransactionList from "./post-list";
import { fetchPost } from "@/lib/actions";

export default function TransactionListWrapper() {
  const response = fetchPost();
  return <TransactionList initialTransactions={response.data.post} />;
}
