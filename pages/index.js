import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";

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


const arr = [
  {
    id: 1,
    user: { name: 'Alice Johnson', profilePic: '/profile1.jpg' },
    content: 'Just had an amazing day at the beach!',
    image: '/beach.jpg',
    likes: 23,
    comments: 5,
  },
  {
    id: 2,
    user: { name: 'Bob Smith', profilePic: '/profile2.jpg' },
    content: 'Can’t believe I ran a marathon today!',
    image: '/marathon.jpg',
    likes: 45,
    comments: 12,
  },
]
export default function Home() {

  return (
    <>
       <h1>Home Page</h1>
       <p>Show general posts in this</p>

    </>
  );
}
