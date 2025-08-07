import Posts from "@/components/posts";
import { getPosts } from "@/lib/posts";
import { PostType } from "@/types/postsType";

export default async function FeedPage() {
  const posts = await getPosts(0);
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts as PostType[]} />
    </>
  );
}
