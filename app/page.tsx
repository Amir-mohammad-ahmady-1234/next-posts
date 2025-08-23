import { Suspense } from "react";

import Posts from "@/components/posts";
import { getPosts } from "@/lib/posts";
import { PostType } from "@/types/postsType";

export const metadata = {
  title: "Browse latest food",
  description: "you can Browse latest food what you want!",
};

async function LatestPosts() {
  const latestPosts = await getPosts(2);
  return <Posts posts={latestPosts as PostType[]} />;
}

export default async function Home() {
  return (
    <>
      <h1>Welcome back!</h1>
      <p>{"Here's what you might've missed."}</p>
      <section id="latest-posts">
        <Suspense fallback={<p>Loading recent posts...</p>}>
          <LatestPosts />
        </Suspense>
      </section>
    </>
  );
}
