import { useFormatCurrency } from "@/hooks/use-format-currency";
import { HandCoins, Wallet, Landmark, PiggyBank, Pencil } from "lucide-react";
import TransactionItemRemoveButton from "./transaction-item-remove-button";
import Link from "next/link";
import { sizes, variants } from "@/lib/variants";

export default function TransactionItem({
  _id,
  title,
  description,
  onRemoved,
}) {
  return (
    <div className="w-full flex items-center">
      <div className="min-w-[150px] items-center hidden md:flex">
        {title && (
          <div className="rounded-md text-xs bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-black px-2 py-0.5">
            {title}
          </div>
        )}
      </div>

      <div className="flex items-center mr-4 grow">
        <span>{description}</span>
      </div>

      <div className="min-w-[100px] flex justify-end">
        <Link
          href={`/dashboard/blog/${_id}/edit`}
          className={`${variants["ghost"]} ${sizes["xs"]}`}
        >
          <Pencil className="w-4 h-4" />
        </Link>
        <TransactionItemRemoveButton id={_id} onRemoved={onRemoved} />
      </div>
    </div>
  );
}
