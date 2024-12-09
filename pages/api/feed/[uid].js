
// import { ObjectId } from "mongodb";
// import getDB from "@/util/mongodb";

// export default async function handler(req, res) {
//   const { uid } = req.query; // Extract user ID from the query
//   const db = await getDB();
//   const userId = uid;

//   console.log("User Id:", userId);

//   // Fetch the logged-in user's following list
//   const following = await db.collection("following").find({ followerId: userId }).toArray();
//   const followedIds = following.map((follow) => follow.followedId);

//   // Fetch posts by the users the logged-in user is following
//   const posts = await db.collection("posts").find({ authorId: { $in: followedIds } }).toArray();

//   // Fetch likes and comments for each post, and check if the current user has liked the post
//   const postsWithDetails = await Promise.all(
//     posts.map(async (post) => {
//       // Ensure postId is consistent across queries
//       const postId = post._id.toString();

//       // Fetch likes for the post
//       const likes = await db.collection("likes").find({ postId }).toArray();

//       // Check if the user has liked the post
//       const userLike = await db.collection("likes").findOne({ postId, userId });

//       // Fetch comments for the post
//       const comments = await db.collection("comments").find({ postId }).toArray();

//       // Fetch the authors of the comments
//       const commentAuthors = await Promise.all(
//         comments.map(async (comment) => {
//           const user = await db.collection("users").findOne({ _id: new ObjectId(comment.authorId) });
//           return {
//             ...comment,
//             authorName: user ? user.name : "Unknown", // Handle case if user is not found
//           };
//         })
//       );

//       return {
//         ...post,
//         likes: likes.length, // Number of likes
//         liked: !!userLike,   // Whether the current user has liked this post
//         comments: commentAuthors, // List of comments with author details
//       };
//     })
//   );

//   res.status(200).json(postsWithDetails);
// }



import { ObjectId } from "mongodb";
import getDB from "@/util/mongodb";

export default async function handler(req, res) {
  const { uid } = req.query; // Extract user ID from the query
  const db = await getDB();
  const userId = uid;

  console.log("User Id:", userId);

  // Fetch the logged-in user's following list
  const following = await db.collection("following").find({ followerId: userId }).toArray();
  const followedIds = following.map((follow) => follow.followedId);

  // Fetch posts by the users the logged-in user is following
  const posts = await db.collection("posts").find({ authorId: { $in: followedIds } }).toArray();

  const UpdatedPosts = [];
  for (const post of posts) {
    const postId = post._id.toString();

    // Fetch likes for the post
    const likes = await db.collection("likes").find({ postId }).toArray();

    // Check if the user has liked the post
    const userLike = await db.collection("likes").findOne({ postId, userId });

    // Fetch comments for the post
    const comments = await db.collection("comments").find({ postId }).toArray();

    // Fetch the authors of the comments
    const commentAuthors = [];
    for (const comment of comments) {
      const user = await db.collection("users").findOne({ _id: new ObjectId(comment.authorId) });
      commentAuthors.push({
        ...comment,
        authorName: user ? user.name : "Unknown", // Handle case if user is not found
      });
    }

    // Fetch the author's name for the post
    const author = await db.collection("users").findOne({ _id: new ObjectId(post.authorId) });

    // Construct the updated post object
    UpdatedPosts.push({
      ...post,
      authorName: author ? author.name : null, // Include the author's name
      liked: !!userLike,   // Whether the current user has liked this post
      comments: commentAuthors, // List of comments with author details
    });
  }

  return res.status(200).json(UpdatedPosts);
}
