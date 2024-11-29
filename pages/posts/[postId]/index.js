import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LikeButton from "@/components/LikeButton";
import Post from "@/components/Posts/Post";
//import CommentSection from "@/components/Comments/CommentSection";

export default function PostDetailsPage() {
  const router = useRouter();
  const { pid } = router.query;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pid) return;

    async function fetchPostDetails() {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        if (!res.ok) throw new Error("Failed to fetch post details");

        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPostDetails();
  }, [pid]);

  if (loading) return <p>Loading post details...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div>

    <Post postId={post._id }title={post.title} content={post.content} author={post.author} />
      
      {/* Like button */}
      {/* <LikeButton postId={pid} initialLiked={false} /> */}

      {/* Comment Section */}
      {/* <h2>Comments</h2>
      <Comment postId={pid} comments={post.comments} /> */}
    </div>
  );
}
