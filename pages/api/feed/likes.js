
// /api/likes.js

import getDB from "@/util/mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { postId, userId } = req.body;
      if (!postId || !userId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const db = await getDB();

      const existingLike = await db.collection("likes").findOne({ postId, userId });
      if (existingLike) {
        await db.collection("likes").deleteOne({ postId, userId });
        return res.status(201).json({ message: "Unliked" });
      }

      const result = await db.collection("likes").insertOne({
        postId:postId,
        userId,
        createdAt: new Date(),
      });

      return res.status(201).json({ message: "Like added successfully", likeId: result.insertedId });
    } catch (error) {
      console.error("Error adding like:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
