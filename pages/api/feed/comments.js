// import getDB from "@/util/mongodb";
// import { ObjectId } from "mongodb";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { postId, userId, content } = req.body;

//     if (!postId || !userId || !content) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     try {
//       const db = await getDB();
      
//       // Create the new comment object
//       const newComment = {
//         userId, // Assuming the userId is passed along with the request
//         content,
//         createdAt: new Date(),
//       };

//       // Update the post by adding the new comment to the comments array
//       const result = await db.collection("posts").updateOne(
//         { _id: new ObjectId(postId) }, 
//         { $push: { comments: newComment } }
//       );

//       if (result.modifiedCount === 1) {
//         return res.status(201).json({ comment: newComment });
//       } else {
//         return res.status(404).json({ message: "Post not found" });
//       }
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Error adding comment" });
//     }
//   } else {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }
// }



import getDB from "@/util/mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { postId, userId, content } = req.body;

      if (!postId || !userId || !content) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const db = await getDB();

      // Insert new comment into the collection
      const result = await db.collection("comments").insertOne({
        postId: postId,
        authorId: userId,
        content,
        createdAt: new Date(),
      });

      // Return the full comment with the inserted ID
      const newComment = {
        _id: result.insertedId.toString(), // Convert ObjectId to string
        postId,
        authorId: userId,
        content,
        createdAt: new Date(),
      };

      return res.status(201).json({ comment: newComment });    
    } catch (error) {
      console.error("Error adding comment:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

