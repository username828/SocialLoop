import Post from "./Post";
import styles from './PostList.module.css';

export default function PostList({ list }) {
    if (!list || list.length === 0) {
        return <p>No posts found.</p>;
    }

    return (
        <div className={styles.list}>
            <ul>
                {list.map(post => (
                    <Post 
                        key={post._id} 
                        postId={post._id} 
                        title={post.title} 
                        content={post.content} 
                        image={post.image}
                        // author={post.authorId} 
                        date={new Date(post.date).toLocaleDateString()} 
                    />
                ))}
            </ul>
        </div>
    );
}
