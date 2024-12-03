// pages/api/profile/[pid].js
import getDB from "@/util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { pid } = req.query;

  console.log("Profile id",pid)

  if (!pid) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const db=await getDB();
    const user = await db.collection("users").findOne({ _id: new ObjectId(pid) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
