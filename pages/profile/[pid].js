// import LikeButton from "@/components/LikeButton";

//import Post from "@/components/Posts/Post";
// import Profile from "@/components/Profile/Profile";

// import { useRouter } from "next/router";
// import {useState} from 'react'
// import { useUser } from "@/store/UserContext";


// import { getSession } from "next-auth/react";

// export default function ProfilePage({profile}) {
//   console.log(profile)
//   //sending userId so that it can be used as authorId later
//   const pid=profile._id

//   return (
// <div>

// <Profile pid={profile._id} name={profile.name}/>
// </div>

//   );
// }

// export async function getServerSideProps(context) {

//   const { pid } = context.params;

//   const res = await fetch(`http://localhost:3000/api/profile/${pid}`);
//   const profile = await res.json();

//   if (!profile) {
//     return { notFound: true };
//   }

//   return {
//     props: { profile },
//   };
// }


//csr, ssr giving errors:

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Profile from "@/components/Profile/Profile";
import NewPost from "@/components/Posts/NewPost";
import Button from "@/components/ui/Button";
import styles from "@/components/Profile/Profile.module.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  const navigateToPosts = () => {
    router.push(`/myposts`);
  };

  const navigateToFeed = () => {
    router.push(`/feed`);
  };

  const navigateToFollowing = () => {
    router.push(`/users`);
  };

  const navigateToLiked = () => {
    router.push(`/liked`);
  };

  const [newPost, setNewPost] = useState(false);
  const toggleNewPost = () => {
    setNewPost((prevState) => !prevState);
  };

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile/${session.user.id}`);
        const profileData = await res.json();
        setProfile(profileData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session, status, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!profile) {
    return <p>No profile found</p>;
  }

  return (
    <div className={styles.profileContainer}>
      <Profile pid={profile._id} name={profile.name} />
      
      {/* Card Container for Buttons */}
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <h3 className={styles.profileTitle}>My Posts</h3>
          <Button className={styles.cardButton} onClick={navigateToPosts}>
            View My Posts
          </Button>
        </div>

        <div className={styles.card}>
          <h3 className={styles.profileTitle}>My Feed</h3>
          <Button className={styles.cardButton} onClick={navigateToFeed}>
            View My Feed
          </Button>
        </div>

        <div className={styles.card}>
          <h3 className={styles.profileTitle}>Users</h3>
          <Button className={styles.cardButton} onClick={navigateToFollowing}>
            View Following
          </Button>
        </div>

        <div className={styles.card}>
          <h3 className={styles.profileTitle}>Create a Post</h3>
          <Button className={styles.cardButton} onClick={toggleNewPost}>
            {newPost ? "Cancel" : "Create Post"}
          </Button>
        </div>

        <div className={styles.card}>
          <h3 className={styles.profileTitle}>My Liked Posts</h3>
          <Button className={styles.cardButton} onClick={navigateToLiked}>
            View Liked Posts
          </Button>
        </div>
      </div>

      {newPost && <NewPost pid={profile._id} />}
    </div>
  );
}




// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import Profile from "@/components/Profile/Profile";
// import { Button, Card, CardContent, Typography, Grid } from "@mui/material";
// import styles from "@/components/Profile/Profile.module.css";
// import NewPost from "@/components/Posts/NewPost";
// export default function ProfilePage() {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const navigateToPosts = () => {
//     router.push(`/myposts`);
//   };

//   const navigateToFeed = () => {
//     router.push(`/feed`);
//   };

//   const navigateToFollowing = () => {
//     router.push(`/users`);
//   };

//   const navigateToLiked = () => {
//     router.push(`/liked`);
//   };

//   const [newPost, setNewPost] = useState(false);
//   const toggleNewPost = () => {
//     setNewPost((prevState) => !prevState);
//   };

//   useEffect(() => {
//     if (status === "loading") return;
//     if (!session) {
//       router.push("/auth");
//       return;
//     }

//     const fetchProfile = async () => {
//       try {
//         const res = await fetch(`/api/profile/${session.user.id}`);
//         const profileData = await res.json();
//         setProfile(profileData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [session, status, router]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!profile) {
//     return <p>No profile found</p>;
//   }

//   return (
//     <div>
//       <Profile pid={profile._id} name={profile.name} />
      
//       {/* Grid layout for buttons in cards */}
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" component="h2">
//                 My Posts
//               </Typography>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 onClick={navigateToPosts}
//               >
//                 View My Posts
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" component="h2">
//                 My Feed
//               </Typography>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 onClick={navigateToFeed}
//               >
//                 View My Feed
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" component="h2">
//                 Following
//               </Typography>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 onClick={navigateToFollowing}
//               >
//                 View Following
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" component="h2">
//                 Create Post
//               </Typography>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 color={newPost ? "secondary" : "primary"}
//                 onClick={toggleNewPost}
//               >
//                 {newPost ? "Cancel" : "Create Post"}
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" component="h2">
//                 Liked Posts
//               </Typography>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 onClick={navigateToLiked}
//               >
//                 View Liked Posts
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {newPost && <NewPost pid={profile._id} />}
//     </div>
//   );
// }
