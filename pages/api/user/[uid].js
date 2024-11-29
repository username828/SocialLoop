import getDB from "@/util/mongodb";
import { MongoClient, ObjectId } from "mongodb";

//for getting user's profile page (including their posts)
export default async function handler(req, res) {
  const { uid } = req.query;
  const db = await getDB()

  
  if (req.method === "POST") {
    // try {
    //   const { username, email } = req.body;
    //   const result = await db.collection("users").insertOne({ username, email });

    //   client.close();
    //   return res.status(201).json({ message: "User created", userId: result.insertedId });
    // } catch (error) {
    //   client.close();
    //   return res.status(500).json({ message: "Failed to create user", error });
    // }
  }

  if (req.method === "GET") {
    
      // Convert `uid` to ObjectId
      const user = await db.collection("users").findOne({ _id: new ObjectId(uid) });

      if (!user) {
        client.close();
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user)

    // // Fetch user's posts
    //     const posts = await db.collection("posts").find({ authorId: uid }).toArray();
    //     console.log(posts)
    //     // Combine user and posts
    //     const profile = { ...user, posts };
     
    //     res.status(200).json(profile);

    //   client.close();
    //   return res.status(200).json(user);
    // } catch (error) {
    //   client.close();
    //   return res.status(500).json({ message: "Failed to fetch user", error });
    // }
  }
}