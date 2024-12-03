// import LikeButton from "@/components/LikeButton";
// import NewPost from "@/components/Posts/NewPost";
// import Post from "@/components/Posts/Post";
// import Profile from "@/components/Profile/Profile";
// import Button from "@/components/ui/Button";
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

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();


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
    <div>
      <Profile pid={profile._id} name={profile.name} />
    </div>
  );
}
