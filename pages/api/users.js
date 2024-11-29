import getDB from "@/util/mongodb";
import { MongoClient, ObjectId } from "mongodb";

//for getting users
export default async function handler(req, res) {
  const db = await getDB()

  if (req.method === "GET") {
    const users = await db.collection("users").find().toArray();
    console.log(users)
    return res.status(200).json(users)
  }
}