import { Suspense } from "react";
import TransactionListFallback from "./components/transaction-list-fallback";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { sizes, variants } from "@/lib/variants";
import TransactionListWrapper from "./components/transaction-list-wrapper";
import BlogSummery from "./components/blog-summery";

export default function Page({ searchParams }) {
  return (
    <div className="space-y-8">
      <BlogSummery />

      <section className="flex justify-between items-center">
        <h2 className="text-2xl">Blogs</h2>
        <Link
          href="/dashboard/blog/add"
          className={`flex items-center space-x-1 ${variants["outline"]} ${sizes["sm"]}`}
        >
          <PlusCircle className="w-4 h-4" />
          <div>Add</div>
        </Link>
      </section>

      <Suspense fallback={<TransactionListFallback />}>
        <TransactionListWrapper />
      </Suspense>
    </div>
  );
}
