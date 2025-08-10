"use server";

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { PreviewData } from "next";
import { redirect } from "next/navigation";

export async function createPost(prevState: PreviewData, formData: FormData) {
  const title = formData.get("title") as string;
  const image = formData.get("image") as File;
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

  let imageUrl;

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    console.log(error);
    throw new Error("can't upload image on cloudinary");
  }

  await storePost({
    image_url: imageUrl,
    title,
    content,
    user_id: 1,
  });

  redirect("/feed");
}

export async function togglePostLikeStatus(postId: number) {
  await updatePostLikeStatus(postId, 2);
}
