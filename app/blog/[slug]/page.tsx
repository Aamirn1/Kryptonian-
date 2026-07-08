import { getPostBySlug, getAllPosts } from "@/lib/blog-server";
import BlogPostClient from "./BlogPostClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found | Krypton Digital",
    };
  }

  return {
    title: `${post.title} | Krypton Digital Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const allPosts = await getAllPosts();

  return <BlogPostClient post={post} allPosts={allPosts} />;
}
