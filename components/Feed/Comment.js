import styles from './Comment.module.css';

const Comment = ({ comment }) => {
    if (!comment) {
        return null; 
      }
    const authorName = comment.authorName ? comment.authorName : 'Unknown Author';
    //console.log("IN comments",comment.authorName)
  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <strong>{authorName}</strong>
        <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
      </div>
      <p>{comment.content}</p>
    </div>
  );
};

export default Comment;
