// components/Post.js
import React from "react";
import styles from "./Post.module.css";
import Image from "next/image";

export default function Post({ title, content, image, author, date }) {
    return (
        <div className={styles.postCard}>
           
            {image && <img src={image} alt={title} className={styles.postImage} />}
            <div className={styles.postContent}>
                <h2 className={styles.postTitle}>{title}</h2>
                <p className={styles.postText}>{content}</p>
                <div className={styles.postMeta}>
                    <span className={styles.postAuthor}>By {author}</span>
                    <span className={styles.postDate}>{date}</span>
                </div>
            </div>
        </div>
    );
}
