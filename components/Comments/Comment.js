import React from "react";
import styles from "./Comment.module.css";

export default function Comment({ author, content, date }) {
  return (
    <div className={styles.comment}>
      <p className={styles.content}>{content}</p>
      <div className={styles.meta}>
        <span className={styles.author}>By: {author}</span>
        <span className={styles.date}>    Date: {new Date(date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
