"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/lib/validation";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { createTransaction, updateTransaction } from "@/lib/actions";
import FormError from "@/components/form-error";

export default function TransactionForm({ initialData }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(transactionSchema),
  });
  const router = useRouter();
  const [isSaving, setSaving] = useState(false);
  const [lastError, setLastError] = useState();
  const editing = Boolean(initialData);

  const onSubmit = async (data) => {
    setSaving(true);
    setLastError();
    // try {
    //   if (editing) {
    //     await updateTransaction(initialData.id, data);
    //   } else {
    //     await createTransaction(data);
    //   }
    //   router.push("/dashboard");
    // } catch (error) {
    //   setLastError(error);
    // } finally {
    //   setSaving(false);
    // }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1">Title</Label>
          <Input type="text" {...register("amount")} />
          <FormError error={errors.amount} />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label className="mb-1">Description</Label>
          <Input {...register("description")} />
          <FormError error={errors.description} />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>{lastError && <FormError error={lastError} />}</div>
        <Button type="submit" disabled={isSaving}>
          Save
        </Button>
      </div>
    </form>
  );
}
