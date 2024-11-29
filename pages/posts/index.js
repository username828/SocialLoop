import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import PostList from "@/components/Posts/PostList";

export default function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const session = await getSession();

            if (!session) {
                router.push("/auth"); // Redirect to auth page if not logged in
                return;
            }

            try {
                const userId = session.user.id; // Assuming the session contains `user.id`
                const res = await fetch(`/api/posts/${userId}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch posts");
                }

                const data = await res.json();
                setPosts(data); // Set fetched posts to state
            } catch (error) {
                console.error(error);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Show a loading state while fetching data
    if (loading) {
        return <p>Loading...</p>;
    }

    // Show a message if no posts are found
    if (posts.length === 0) {
        return <p>No posts found.</p>;
    }

    return (
        <>
            <h1>All Posts</h1>
            <PostList list={posts} />
        </>
    );
}
