"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/lib/validation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTransaction, updateTransaction } from "@/lib/actions";
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
    defaultValues: initialData ?? {
      created_at: new Date().toISOString().split("T")[0],
    },
  });
  const router = useRouter();
  const [isSaving, setSaving] = useState(false);
  const [lastError, setLastError] = useState();
  const editing = Boolean(initialData);

  const onSubmit = async (data) => {
    setSaving(true);
    setLastError();
    try {
      if (editing) {
        await updateTransaction(initialData.id, data);
      } else {
        await createTransaction(data);
      }
      router.push("/dashboard");
    } catch (error) {
      setLastError(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="space-y-8">
      {/* Post Details */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <p className="text-gray-600">{post.content}</p>
      </div>

      {/* Comments List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-800">{comment.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  — {comment.author} · {formatDate(comment.createdAt)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Label htmlFor="comment">Add a Comment</Label>
        <Input
          id="comment"
          type="text"
          placeholder="Write your comment..."
          {...register("comment")}
        />
        <FormError error={errors.comment} />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            Submit Comment
          </Button>
        </div>
      </form>
    </section>
  );
}
