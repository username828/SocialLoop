import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import FeedPost from "@/components/Feed/FeedPost"; // Reuse the post component
import styles from "@/components/Feed/Feed.module.css";

const LikedPosts = () => {
  const { data: session, status } = useSession();
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session) return;

    const fetchLikedPosts = async () => {
      try {
        const response = await fetch("/api/liked");
        if (!response.ok) {
          throw new Error("Failed to fetch liked posts");
        }
        const data = await response.json();
        setLikedPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedPosts();
  }, [session]);

  if (!session) {
    return <div>Please log in to view your liked posts.</div>;
  }

  if (loading) {
    return <div>Loading your liked posts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.feedContainer}>
      <h1>Liked Posts</h1>
      {likedPosts.length === 0 ? (
        <p>You haven't liked any posts yet.</p>
      ) : (
        likedPosts.map((post) => <FeedPost key={post._id} post={post} />)
      )}
    </div>
  );
};

export default LikedPosts;
