import LikeButton from "@/components/LikeButton";
import NewPost from "@/components/Posts/NewPost";
import Post from "@/components/Posts/Post";
import Profile from "@/components/Profile/Profile";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import {useState} from 'react'
import { useUser } from "@/store/UserContext";


import { getSession } from "next-auth/react";

export default function ProfilePage({profile}) {
  console.log(profile)
  //sending userId so that it can be used as authorId later
  const pid=profile._id


  const { setFollowerId } = useUser();
  setFollowerId(pid)
  //console.log(pid)


  // const [newPost,setNewPost]=useState(false);
  // const toggleNewPost=()=>{
  //   setNewPost(prevState=>!prevState)
  // }

const router=useRouter()
  const navigateToPosts = () => {
    router.push(`/posts`);
  };
  return (
    <div>
      <h1>Profile Page</h1>
      <Profile pid={profile._id} name={profile.name} bio={profile.bio}/>

      <Button onClick={navigateToPosts}>View My Posts</Button>
      {/* <Button onClick={handleFollowing} lnk="/friends">View Following</Button> */}

      {/* Mapping posts on profile page */}
      {/* <ul>
        {props.profile.posts.map((post) =>(
          <li key={post._id}>
          <Post postId={post._id} title={post.title} content={post.content} date={post.date}/>
          <LikeButton postId={post._id} userId={pid} initialLiked={"false"}/>
          </li>
        ))}

      </ul> */}


      {/* Creating new Post */}
      {/* <button onClick={toggleNewPost}>
        {newPost ? "Cancel" : "Create Post"}
      </button>

      {newPost && <NewPost pid={pid}/>} */}
      
    </div>
  );
}

export async function getServerSideProps(context) {

  const { pid } = context.params;

  const res = await fetch(`http://localhost:3000/api/user/${pid}`);
  const profile = await res.json();

  if (!profile) {
    return { notFound: true };
  }

  return {
    props: { profile },
  };
}
