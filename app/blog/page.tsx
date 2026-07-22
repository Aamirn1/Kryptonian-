import { getAllPosts, getAllCategories } from "@/lib/blog-server";
import BlogClient from "./BlogClient";

export const metadata = {
  title: "Blog | Krypton Digital",
  description:
    "Expert insights, industry trends, and proven strategies to grow your digital presence.",
};

export default async function BlogPage() {
  // Fetch data server-side
  const posts = await getAllPosts();
  const categories = await getAllCategories();

  return <BlogClient initialPosts={posts} categories={categories} />;
}
