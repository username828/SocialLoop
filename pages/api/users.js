//following
import { getSession } from "next-auth/react";
import getDB from "@/util/mongodb";

export default async function handler(req, res) {

  

  const db = await getDB();
  const currentUserId = session.user.id;

  const users = await db.collection("users").find().toArray();

  const following = await db
    .collection("following")
    .find({ followerId: currentUserId })
    .toArray();

  const followedIds = following.map((follow) => follow.followedId);

  const enrichedUsers = users.map((user) => ({
    ...user,
    isFollowing: followedIds.includes(user._id.toString()),
  }));

  res.status(200).json(enrichedUsers);
}
