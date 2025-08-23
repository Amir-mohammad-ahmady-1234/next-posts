"use client";

import { useOptimistic } from "react";

import { formatDate } from "@/lib/format";
import { PostType } from "@/types/postsType";
import { togglePostLikeStatus } from "@/actions/posts";
import LikeButton from "./like-icon";
import Image, { ImageLoaderProps } from "next/image";

function Post({
  post,
  action,
}: {
  post: PostType;
  action: (postId: number) => void;
}) {
  function ImageLoader(config: ImageLoaderProps) {
    const startUrl = config.src.split("upload/")[0];
    const endUrl = config.src.split("upload/")[1];
    const transformation = `w_200,q_${config.quality}`;

    return `${startUrl}upload/${transformation}/${endUrl}`;
  }

  return (
    <article className="post">
      <div className="post-image">
        <Image
          loader={ImageLoader}
          src={post.image}
          width={200}
          height={120}
          alt={post.title}
          quality={50}
        />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }: { posts: PostType[] }) {
  const [optimisticPost, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPost, updatedPostId) => {
      const updatedPostIndex = prevPost.findIndex(
        (post) => post.id === updatedPostId
      );

      if (updatedPostIndex === -1) {
        return prevPost;
      }

      const updatedPost = { ...prevPost[updatedPostIndex] };
      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
      updatedPost.isLiked = !updatedPost.isLiked;
      const newPosts = [...prevPost];
      newPosts[updatedPostIndex] = updatedPost;
      return newPosts;
    }
  );

  if (!optimisticPost || optimisticPost.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(postId: number) {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {optimisticPost.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
