import { useState, useEffect } from 'react';
import FeedPost from '@/components/Feed/FeedPost';
import { useSession } from 'next-auth/react';
import styles from '../../components/Feed/Feed.module.css';

const fetchPosts = async (userId) => {
  const response = await fetch(`/api/feed/${userId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Error fetching posts');
  }

  return response.json();
};

const Feed = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      return;
    }

    const fetchData = async () => {
      try {
        const data = await fetchPosts(session.user.id);
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  if (!session) {
    return <div>You need to be logged in to view your feed.</div>;
  }
  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error loading posts: {error}</div>;
  }

  return (
    <div className={styles.feedContainer}>
      <h1>Feed</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <FeedPost key={post._id} post={post} />
        ))
      )}
    </div>
  );
};

export default Feed;
