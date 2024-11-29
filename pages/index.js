import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Post from "@/components/Posts/Post";
import axios from "axios";
import { getGeneralPosts } from "@/util/api-util";
import LikeButton from "@/components/LikeButton";

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
       <h1>Home Page</h1>
       <p>Show general posts in this</p>

      {
        props.posts.map(post=>{
          return <Post title={post.title}
            author={post.author} content={post.content} date={post.date}
          />
  
        })
      }

    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/general-posts")
  const posts=await res.json()
  return{
    props:{
      posts,
    }
  }
}
