import { getSession } from "next-auth/react";
import getDB from "@/util/mongodb";

export default async function handler(req, res) {

  const db = await getDB();

  if (req.method === "POST") {
    const { followedId } = req.body;

    if (!followedId) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const existingFollow = await db
      .collection("following")
      .findOne({ followerId: currentUserId, followedId });

    if (existingFollow) {
      // Unfollow
      await db.collection("following").deleteOne({ _id: existingFollow._id });
      return res.status(200).json({ success: true, message: "Unfollowed successfully" });
    } else {
      // Follow
      await db.collection("following").insertOne({
        followerId: currentUserId,
        followedId,
      });
      return res.status(201).json({ success: true, message: "Followed successfully" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
