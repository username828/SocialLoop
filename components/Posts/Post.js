import React from "react";
import styles from "./Post.module.css";
import LikeButton from "../LikeButton";
import Button from "../ui/Button";
import Image from "next/image";

import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
export default function Post({ postId, title, content, image,author, date }) {
   //const router=useRouter()
    return (
        <div className={styles.postCard}>
            <div className={styles.postContent}>
                <h2 className={styles.postTitle}>{author}: {title}</h2>
                <p className={styles.postText}>{content}</p>
                <div className={styles.postMeta}>
                    <span className={styles.postAuthor}>{author}</span>
                    <span className={styles.postDate}>{date}</span>
                </div>

                {image && (<div><Image src={image} alt="Post image" width={700} height={400} /></div>)}
            </div>
            <Button lnk={`myposts/${postId}`}>View Post Details</Button>
        </div>
    );
}
