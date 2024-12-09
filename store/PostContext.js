import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session) return;

    const fetchPosts = async () => {
      
        const response = await fetch(`/api/feed/${session.user.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      
    };

    fetchPosts();
  }, [session]);

  const addCommentToPost = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  const toggleLike = (postId, userId, liked) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              liked: !liked,
            }
          : post
      )
    );
    
    fetch('/api/feed/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postId,
        userId,
        liked: !liked,
      }),
    }).catch((error) => console.error("Error updating like status:", error));
  };

  return (
    <PostsContext.Provider value={{ posts, setPosts, loading, error, addCommentToPost, toggleLike }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
