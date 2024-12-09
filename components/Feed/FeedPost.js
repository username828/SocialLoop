import { useSession } from 'next-auth/react';
import { usePosts } from '@/store/PostContext';
import Comment from './Comment';
import styles from './FeedPost.module.css';
import Button from '../ui/Button';
import { useRef } from 'react';
const FeedPost = ({ post }) => {
  const { data: session } = useSession();
  const { toggleLike, addCommentToPost } = usePosts();
  const commentInputRef = useRef(null);

  const handleLikePost = async () => {
    if (!session) {
      alert("You need to log in to like posts.");
      return;
    }
    toggleLike(post._id, session.user.id, post.liked);
  };

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
        addCommentToPost(post._id, data.comment);
        commentInputRef.current.value = '';
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{post.title}</h2>
        <span>{new Date(post.date).toLocaleDateString()}</span>
      </div>
      <p>{post.content}</p>

      <div className={styles.actions}>
        <Button onClick={handleLikePost}>
          {post.liked ? `Unlike` : `Like`}
        </Button>
      </div>

      <div className={styles.comments}>
        <h3>Comments</h3>
        {post.comments.length ? (
          post.comments.map((comment) => <Comment key={comment._id} comment={comment} />)
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
