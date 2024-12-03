import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import getDB from "@/util/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = session.user.id; // Get the logged-in user's ID
  const db = await getDB();

  try {
    // Fetch all likes by the user
    const likes = await db.collection("likes").find({ userId }).toArray();

    // Extract post IDs from the likes
    const postIds = likes.map((like) => new ObjectId(like.postId));

    // Fetch posts matching the liked post IDs
    const likedPosts = await db.collection("posts").find({ _id: { $in: postIds } }).toArray();

    res.status(200).json(likedPosts);
  } catch (error) {
    console.error("Error fetching liked posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
