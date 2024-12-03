import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LikeButton from "@/components/LikeButton";
import Post from "@/components/Posts/Post";
import PostDetails from "@/components/Posts/PostDetails";
import CommentSection from "@/components/Comments/CommentSection";
import { getSession } from "next-auth/react";


export default function PostDetailsPage() {
  const router = useRouter();
  const { postId } = router.query;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    fetchPostDetails();

    // getSession().then(session=>{

    //   if (!session){
    //     router.push('/')
    //   }
    // })
  }, []);

  async function fetchPostDetails() {
    const res = await fetch(`/api/postDetails/${postId}`);
    const data= await res.json()
    setPost(data);    
    setLoading(false);
  }

  if (loading) return <p>Loading post details...</p>;
  if (!post) return <p>Post not found.</p>;

  return (


    <div>
      {console.log(post)}
    <PostDetails postId={post._id} title={post.title} image={post.image}content={post.content} author={post.authorName} likes={post.likes} count={post.likesCount} />
    <CommentSection comments={post.comments} />
    </div>
  );
}
