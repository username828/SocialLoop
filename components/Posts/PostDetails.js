import styles from './PostDetails.module.css'
import Image from "next/image";
export default function PostDetails({ title, content, author,image, date, likes, count }){
    console.log("Count ",count)
    return(

        <div>
            

            <div className={styles.postCard}>
            <div className={styles.postContent}>
                <h2 className={styles.postTitle}>{author}: {title}</h2>
                <p className={styles.postText}>{content}</p>
                {image &&<div><Image src={image} alt="Post image" width={700} height={400}/></div>}
                <div className={styles.postMeta}>
                    <span className={styles.postDate}>{date}</span>
                </div>
                {<p className={styles.postLikes}>Likes:{count}</p>}
            </div>
            {/* <LikeButton />
            <Comment pid={postId} /> */}
        </div>
        </div>
    )    
}