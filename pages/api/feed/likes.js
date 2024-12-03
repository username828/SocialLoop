// import getDB from "@/util/mongodb";
// import { ObjectId } from "mongodb";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { postId, userId } = req.body;

//     if (!postId || !userId) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     try {
//       const db = await getDB();

//       // Check if the user has already liked the post
//       const post = await db.collection("posts").findOne({ _id: new ObjectId(postId) });

//       if (!post) {
//         return res.status(404).json({ message: "Post not found" });
//       }

//       // If the user has already liked, unlike it, else like it
//       let updatedPost;
//       if (post.liked) {
//         updatedPost = await db.collection("posts").updateOne(
//           { _id: new ObjectId(postId) },
//           {
//             $set: { liked: false },
//             $inc: { likes: -1 },
//           }
//         );
//       } else {
//         updatedPost = await db.collection("posts").updateOne(
//           { _id: new ObjectId(postId) },
//           {
//             $set: { liked: true },
//             $inc: { likes: 1 },
//           }
//         );
//       }

//       if (updatedPost.modifiedCount === 1) {
//         return res.status(200).json({ liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 });
//       } else {
//         return res.status(500).json({ message: "Error toggling like" });
//       }
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Error handling like/unlike" });
//     }
//   } else {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }
// }



// /api/likes.js

import getDB from "@/util/mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { postId, userId } = req.body;

      // Ensure postId and userId are provided
      if (!postId || !userId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const db = await getDB();

      // Check if the like already exists
      const existingLike = await db.collection("likes").findOne({ postId, userId });
      if (existingLike) {
        return res.status(400).json({ message: "User has already liked this post" });
      }

      // Insert new like into the collection
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
