import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import Post from "@/components/Posts/Post";
import PostDetails from "@/components/Posts/PostDetails";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
export default function Home(props) {

  return (
    <>

      {
        props.posts.map(post=>{
          
          return <PostDetails key={post._id} title={post.title} author={post.authorName} content={post.content} image={post.image} date={post.date} count={post.likeCount}/>
  
        })
      }

    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/mostliked")
  const posts=await res.json() 
  console.log(posts)
  return{
    props:{
      posts
    }
  }
}
