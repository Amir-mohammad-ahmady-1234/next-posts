import PostForm from "@/components/post-form";
import { storePost } from "@/lib/posts";
import { PreviewData } from "next";
import { redirect } from "next/navigation";

export default function NewPostPage() {
  async function createPost(prevState: PreviewData, formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const image = formData.get("image") as { size: number };
    const content = formData.get("content") as string;

    const errors = [];

    if (!title || title.trim().length === 0) {
      errors.push("Title is required");
    }

    if (!image || image.size === 0) {
      errors.push("Image is required");
    }

    if (!content || content.trim().length === 0) {
      errors.push("Content is required");
    }

    if (errors.length > 0) return { errors };

    await storePost({
      image_url: "",
      title,
      content,
      user_id: 1,
    });

    redirect("/feed");
  }

  return <PostForm action={createPost} />;
}
