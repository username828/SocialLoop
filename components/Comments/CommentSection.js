import React from "react";
import Comment from "./Comment";
import styles from "./CommentSection.module.css";

export default function CommentSection({ comments }) {
  if (!comments || comments.length === 0) {
    return <p>No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className={styles.commentSection}>
      <h3>Comments</h3>
      <div className={styles.commentsList}>
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            author={comment.authorName}
            content={comment.content}
            date={comment.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
