import React from "react";
import styles from "./Post.module.css";
import LikeButton from "../LikeButton";
import Comment from "../Comment";
import { useRouter } from "next/router";

export default function Post({ postId, title, content, author, date }) {
   const router=useRouter()
    return (
        <div className={styles.postCard}>
            <div className={styles.postContent}>
                <h2 className={styles.postTitle}>{title}</h2>
                <p className={styles.postText}>{content}</p>
                <div className={styles.postMeta}>
                    <span className={styles.postAuthor}>By {author}</span>
                    <span className={styles.postDate}>{date}</span>
                </div>
            </div>
            <button onClick={()=>router.push(`/posts/${postId}`)}>View Post Details</button>
            {/* <LikeButton />
            <Comment pid={postId} /> */}
        </div>
    );
}
