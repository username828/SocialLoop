import getDB from "@/util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const db = await getDB();

  // Step 1: Get all the likes from the database
  const likes = await db.collection('likes').find().toArray();

  // Step 2: Count the number of likes for each post
  const likeCounts = likes.reduce((acc, like) => {
    // Increment the count for the postId
    acc[like.postId] = (acc[like.postId] || 0) + 1;
    return acc;
  }, {});

  // Step 3: Create an array of posts with their like count
  const postsWithLikes = Object.entries(likeCounts).map(([postId, likeCount]) => ({
    postId,
    likeCount
  }));

  // Step 4: Sort the posts by likeCount in descending order
  const sortedPosts = postsWithLikes.sort((a, b) => b.likeCount - a.likeCount);

  // Step 5: Limit to the top 2 or 3 most liked posts
  const topPosts = sortedPosts.slice(0, 3);  // Change the number 3 to 2 if you want top 2 posts

  console.log("Top Posts",topPosts)
  // Optional: Fetch post details (e.g., title, content) from the posts collection
  const postIds = topPosts.map(post => new ObjectId(post.postId)); // Convert postId to ObjectId
  const posts = await db.collection('posts').find({ _id: { $in: postIds } }).toArray();

  console.log(posts)
  // Step 6: Combine the posts with the like counts
  const postsWithLikeCounts = posts.map(post => {
    const likeCount = likeCounts[post._id.toString()] || 0;
    return { ...post, likeCount };
  });

  console.log(postsWithLikeCounts)

  // Step 7: Return the most liked posts
  return res.status(200).json(postsWithLikeCounts);
}
