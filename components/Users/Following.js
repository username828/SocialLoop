// import { useState, useEffect } from "react";
// import { getSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import styles from "./Following.module.css";

// export default function UsersList() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   // useEffect runs when the component is mounted
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const session = await getSession(); // Get the session

//       // If no session (user not logged in), redirect to home page
//       if (!session) {
//         router.push("/auth"); // Redirect user to login or home page
//         return;
//       }

//       try {
//         // Fetch users data
//         const res = await fetch(`/api/user/${session.user.id}`);
//         if (!res.ok) {
//           console.error("Failed to fetch users:", res.statusText);
//           setLoading(false);
//           return;
//         }

//         const data = await res.json();
//         setUsers(data); // Set users if the fetch is successful
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false); // Hide loading spinner after fetching data
//       }
//     };

//     fetchUserData(); // Invoke the function to fetch user data
//   }, []); // Only run on initial mount (empty dependency array)

//   const handleFollow = async (followedId) => {
//     const session = await getSession();
//     if (!session) {
//       router.push("/"); // If no session, redirect to home page
//       return;
//     }

//     try {
//       const res = await fetch(`/api/user/${session.user.id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ followedId }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         // Update follow status locally
//         setUsers((prev) =>
//           prev.map((user) =>
//             user._id === followedId
//               ? { ...user, isFollowing: !user.isFollowing }
//               : user
//           )
//         );
//       } else {
//         console.error("Failed to update follow status:", data.message);
//       }
//     } catch (error) {
//       console.error("Error following user:", error);
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Users</h1>
//       <div className={styles.list}>
//         {users.map((user) => (
//           <div className={styles.card} key={user._id}>
//             <p className={styles.name}>{user.name}</p>
//             <button
//               className={`${styles.followButton} ${
//                 user.isFollowing ? styles.following : styles.notFollowing
//               }`}
//               onClick={() => handleFollow(user._id)}
//             >
//               {user.isFollowing ? "Unfollow" : "Follow"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



//using useSession


import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./Following.module.css";

export default function UsersList() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; 
    if (!session) {
      router.push("/auth");
      return;
    }

    const fetchUserData = async () => {
        const res = await fetch(`/api/user/${session.user.id}`);
        if (!res.ok) {
          console.error("Failed to fetch users:", res.statusText);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUsers(data);

        setLoading(false);
      
    };

    fetchUserData();
  }, []);

  const handleFollow = async (followedId) => {
    if (!session) {
      router.push("/");
      return;
    }

    try {
      const res = await fetch(`/api/user/${session.user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followedId }),
      });

      const data = await res.json();

      if (data.success) {
        // Updating follow status
        setUsers(prev=>prev.map(user=>user._id === followedId ? { ...user, isFollowing: !user.isFollowing }: user));
      } else {
        console.error("Failed to update follow status:", data.message);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  if (status === "loading" || loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users</h1>
      <div className={styles.list}>
        {users.map((user) => (
          <div className={styles.card} key={user._id}>
            <p className={styles.name}>{user.name}</p>
            <button
              className={`${styles.followButton} ${
                user.isFollowing ? styles.following : styles.notFollowing
              }`}
              onClick={() => handleFollow(user._id)}
            >
              {user.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

