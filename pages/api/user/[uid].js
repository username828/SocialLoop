import getDB from "@/util/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const db = await getDB();
  const { uid } = req.query;

  if (!ObjectId.isValid(uid)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  if (req.method === "GET") {
    try {
      const users = await db
        .collection("users")
        .find({ _id: { $ne: new ObjectId(uid) } })
        .toArray();

      const following = await db
        .collection("following")
        .find({ followerId: uid })
        .toArray();

      const followedIds = following.map((f) => f.followedId.toString());

      const userList = users.map((user) => ({
        ...user,
        isFollowing: followedIds.includes(user._id.toString()),
      }));

      return res.status(200).json(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "Failed to fetch users" });
    }
  }

  if (req.method === "POST") {
    try {
      const { followedId } = req.body;

      if (!ObjectId.isValid(followedId)) {
        return res.status(400).json({ message: "Invalid followed ID" });
      }

      const existingFollow = await db
        .collection("following")
        .findOne({ followerId: uid, followedId });

      if (existingFollow) {
        // Unfollow
        await db.collection("following").deleteOne({ _id: existingFollow._id });
        return res.status(200).json({ success: true, message: "Unfollowed successfully" });
      } else {
        // Follow
        await db.collection("following").insertOne({
          followerId: uid,
          followedId,
        });
        return res.status(201).json({ success: true, message: "Followed successfully" });
      }
    } catch (error) {
      console.error("Error updating follow status:", error);
      return res.status(500).json({ message: "Failed to update follow status" });
    }
  }
}
