// import { getSession } from "next-auth/react";
// import getDB from "@/util/mongodb";

// export default async function handler(req, res) {
// const session = await getSession({ req }); // Ensure we get the session for the user

// //   if (!session) {
// //     return res.status(401).json({ message: "Unauthorized" }); // Return Unauthorized if no session
// //   }

//   const db = await getDB();
//   const userId = session.user.id;

//   console.log(userId)

//   // Fetch the logged-in user's following list
//   const following = await db
//     .collection("following")
//     .find({ followingId: userId })
//     .toArray();

//   // Extract the list of followed userIds from the "following" collection
//   const followedIds = following.map(follow => follow.followedId);
  
//   // Include the logged-in user's posts as well
//   followedIds.push(userId);

//   // Fetch posts by the users the logged-in user is following
//   const posts = await db
//     .collection("posts")
//     .find({ authorId: { $in: followedIds } }) // Fetch posts from followed users
//     .toArray();

//   // Fetch likes and comments for each post, and check if the current user has liked the post
//   const postsWithDetails = await Promise.all(
//     posts.map(async (post) => {
//       // Fetch likes for the post
//       const likes = await db.collection("likes").find({ postId: post._id }).toArray();
      
//       // Check if the user has liked the post
//       const userLike = await db.collection("likes").findOne({ postId: post._id, userId });

//       // Fetch comments for the post
//       const comments = await db.collection("comments").find({ postId: post._id }).toArray();

//       return {
//         ...post,
//         likes: likes.length,  // Number of likes
//         liked: !!userLike,    // Whether the current user has liked this post
//         comments: comments,   // List of comments
//       };
//     })
//   );

//   res.status(200).json(postsWithDetails);
// }
