"use client";
import { Suspense } from "react";
import TransactionListFallback from "./components/transaction-list-fallback";
// import Trend from "./components/trend";
import TrendFallback from "./components/trend-fallback";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { sizes, variants } from "@/lib/variants";
import { ErrorBoundary } from "react-error-boundary";
import { types } from "@/lib/consts";
// import Range from "./components/range";
import TransactionListWrapper from "./components/transaction-list-wrapper";
import useAuthStore from "@/store/useAuthStore";

export default function Page({ searchParams }) {
  const { user, token } = useAuthStore();

  return (
    <div className="space-y-8">
      <section className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Summary</h1>
        <aside>
          {/* <Range defaultView={settings?.defaultView} /> */}
          <h1>Hello, {user?.username}</h1>
        </aside>
      </section>

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
