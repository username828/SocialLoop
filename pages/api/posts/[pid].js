import getDB from "@/util/mongodb";
import { MongoClient, ObjectId } from "mongodb";


//for adding new post
export default async function handler(req, res) {
  const { pid } = req.query;

  console.log(pid)

  const db = await getDB();

  if (req.method === "POST") {
      const { title, content } = req.body;

      if (!title || !content) {
          return res.status(400).json({ message: "Title and content are required." });
      }

      try {
          const newPost = {
              title,
              content,
              authorId: pid,
              date: new Date(),
          };

          await db.collection("posts").insertOne(newPost);
          return res.status(201).json({ message: "Post created successfully", post: newPost });
      } catch (error) {
          return res.status(500).json({ message: "Internal Server Error", error });
      }
  } 
  else {
      try {
          const posts = await db.collection("posts").find({ authorId: pid }).toArray();

          console.log(posts)

          if (!posts || posts.length === 0) {
              return res.status(404).json({ message: "No posts found for this user." });
          }

          return res.status(200).json(posts);
      } catch (error) {
          return res.status(500).json({ message: "Internal Server Error", error });
      }
  }
}