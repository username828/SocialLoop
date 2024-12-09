import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import getDB from "@/util/mongodb";
import getAuthorName from "@/util/helper";

export default async function handler(req, res) {

  const {userId} = req.query;
  const db = await getDB();

  try {
    // Fetch all likes by the user
    const likes = await db.collection("likes").find({ userId }).toArray();

    // Extract post IDs from the likes
    const postIds = likes.map((like) => new ObjectId(like.postId));

    // Fetch posts matching the liked post IDs
    const likedPosts = await db.collection("posts").find({ _id: { $in: postIds } }).toArray();
    const UpdatedPosts = [];

    for (const post of likedPosts){
      const author=await db.collection('users').findOne({_id:new ObjectId(post.authorId)})
      UpdatedPosts.push({
        ...post,
        authorName:author?author.name : null
      })
    }

    res.status(200).json(UpdatedPosts);
  } catch (error) {
    console.error("Error fetching liked posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
