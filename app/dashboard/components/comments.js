"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/lib/validation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addComment } from "@/lib/actions";
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
    resolver: zodResolver(commentSchema),
  });
  const router = useRouter();
  const [isSaving, setSaving] = useState(false);
  const [lastError, setLastError] = useState();
  const [comments, setComments] = useState(initialData.comments || []);

  const onSubmit = async (data) => {
    setSaving(true);
    setLastError();
    try {
      const response = await addComment(data, initialData._id);
      const newComment = {
        _id: Date.now(), // Ideally from response (e.g., response.comment._id)
        content: data.content,
      };

      setComments((prev) => [...prev, newComment]); // append new comment
      setValue("content", "");
    } catch (error) {
      setLastError(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="space-y-8">
      {/* Post Details */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">{initialData.title}</h1>
        <p className="text-gray-600">{initialData.content}</p>
      </div>

      {/* Comments List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="border p-4 rounded-md shadow-sm"
              >
                <p className="text-sm text-gray-800">{comment.content}</p>
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
          {...register("content")}
        />
        <FormError error={errors.comment} />
        <div className="flex justify-end">
          <Button disabled={isSaving} type="submit">
            Submit Comment
          </Button>
        </div>
      </form>
    </section>
  );
}
