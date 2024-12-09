import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import FeedPost from "@/components/Feed/FeedPost"; // Reuse the post component
import styles from "@/components/Feed/Feed.module.css";
import PostList from "@/components/Posts/PostList";
import useSWR from "swr";
import Post from "@/components/Posts/Post";
import PostDetails from "@/components/Posts/PostDetails";
import getAuthorName from "@/util/helper";
const LikedPosts = () => {
  const {data: session, status } = useSession();
  const userId=session?.user?.id 
  const fetcher= (url)=>fetch(url).then(res=>res.json());
  const {data:posts,error}=useSWR(`http://localhost:3000/api/likedByUser/${userId}`,fetcher)
  console.log(posts)

  if (status === "loading") {
    return <div>Loading your session...</div>;
  }

  if (!session) {
    return <div>You must be logged in to view liked posts.</div>;
  }

  if (!posts && !error) {
    return <div>Loading your liked posts...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.feedContainer}>
      <h1>Liked Posts</h1>
      {posts.length === 0 ? (
        <p>You haven't liked any posts yet.</p>
      ) : (
        posts.map((post) => <PostDetails postId={post._id} title={post.title} content={post.content} image={post.image} author={post.authorName} />)
      )}
    </div>
  );
};

export default LikedPosts;
