import BlogForm from "../../components/blog-form";

export const metadata = {
  title: "Add Blog",
};

export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Add Blog</h1>
      <BlogForm />
    </>
  );
}
