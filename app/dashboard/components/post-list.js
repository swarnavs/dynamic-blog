"use client";
import Button from "@/components/button";
import Separator from "@/components/separator";
import TransactionItem from "@/components/transaction-item";
import { useState } from "react";
import { Loader } from "lucide-react";
import { fetchPostList } from "@/lib/api/post";
import useAuthStore from "@/store/useAuthStore";

export default function TransactionList({ initialTransactions }) {
  const { token } = useAuthStore();
  const [transactions, setTransactions] = useState(initialTransactions);
  const [buttonHidden, setButtonHidden] = useState(
    initialTransactions.length === 0
  );
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    let nextTransactions = null;
    try {
      nextTransactions = await fetchPostList(token);
      setButtonHidden(nextTransactions.data.post.length === 0);
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        ...nextTransactions,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoved = (id) => () => {
    setTransactions((prev) => [...prev].filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-8">
      <Separator />
      <section className="space-y-4">
        {transactions.map((post) => (
          <div key={post._id}>
            <TransactionItem
              key={post._id}
              {...post}
              onRemoved={handleRemoved(post._id)}
            />
          </div>
        ))}
      </section>
      {transactions.length === 0 && (
        <div className="text-center text-gray-400 dark:text-gray-500">
          No blog found
        </div>
      )}
      {!buttonHidden && (
        <div className="flex justify-center">
          <Button variant="ghost" onClick={handleClick} disabled={loading}>
            <div className="flex items-center space-x-1">
              {loading && <Loader className="animate-spin" />}
              <div>Load More</div>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
