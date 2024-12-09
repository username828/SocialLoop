// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { getSession } from "next-auth/react";
// import PostList from "@/components/Posts/PostList";

// export default function PostsPage() {
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();

//     useEffect(() => {
//         fetchPosts();
//     }, []);

//     const fetchPosts = async () => {
//         const session = await getSession();

//         if (!session) {
//             router.push("/auth"); // Redirect to auth page if not logged in
//             return
//         }
//         const userId=session.user.id
//         const res=await fetch(`/api/posts/${userId}`)
//         const data=await res.json()
//         setPosts(data)
//         setLoading(false)


//     };

//     if (loading) {
//         return <p>Loading...</p>;
//     }
//     if (posts.length === 0) {
//         return <p>No posts found.</p>;
//     }

//     return (
//         <>
//             <h1>My Posts</h1>
//             <PostList list={posts} />
//         </>
//     );
// }


//using useSession


import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import PostList from "@/components/Posts/PostList";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; 
    if (!session) {
      router.push("/auth");
      return;
    }

    const fetchPosts = async () => {

        const userId = session.user.id;
        const res = await fetch(`/api/posts/${userId}`);
        const data = await res.json();
        setPosts(data);
        setLoading(false);

    };

    fetchPosts();
  }, []);

  if (status === "loading" || loading) {
    return <p>Loading...</p>;
  }

  if (posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <>
      <h1>My Posts</h1>
      <PostList list={posts} />
    </>
  );
}
