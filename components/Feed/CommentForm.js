import styles from './CommentForm.module.css';

const CommentForm = ({ comment, setComment, onAddComment }) => {
  return (
    <form className={styles.form} onSubmit={onAddComment}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
