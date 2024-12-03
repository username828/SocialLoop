import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react'; // Import useSession
import Image from 'next/image';
import Comment from './Comment';
import styles from './FeedPost.module.css';

const FeedPost = ({ post }) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);


  const commentInputRef = useRef(null);

  const handleAddComment = async (event) => {
    event.preventDefault();

    const newComment = commentInputRef.current.value.trim();
    if (!newComment) return;

    try {
      const response = await fetch('/api/feed/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: post._id,
          userId: session.user.id, 
          content: newComment,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setComments((prevComments) => [...prevComments, data.comment]);
        commentInputRef.current.value = ''; 
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleLikePost = async () => {
    try {
      const response = await fetch('/api/feed/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: post._id,
          userId: session.user.id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsLiked(data.liked);
        setLikes(data.likes);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  if (!session) {
    return <p>Please log in to comment or like posts.</p>; // Show a message if not logged in
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{post.title}</h2>
        <span>{new Date(post.date).toLocaleDateString()}</span>
      </div>
      <p>{post.content}</p>

      <div className={styles.imageContainer}>
        <Image
          src={post.image}
          alt={post.title}
          width={400}
          height={300}
          layout="responsive"

        />
      </div>

      <div className={styles.actions}>
        <button onClick={handleLikePost}>
          {isLiked ? 'Unlike' : 'Like'} 
        </button>
      </div>

      <div className={styles.comments}>
        <h3>Comments</h3>

        {comments.length ? (
          comments.map((comment) => (
            <Comment comment={comment} />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      <form onSubmit={handleAddComment}>
        <input
          type="text"
          ref={commentInputRef}
          placeholder="Add a comment..."
          className={styles.commentInput}
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default FeedPost;
