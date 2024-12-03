import getDB from "@/util/mongodb";

export default async function handler(req, res) {
  const db = await getDB();
  const { postId } = req.query;

  if (req.method === "POST") {
    // Handle liking a post
    const session = await getSession({ req }); // Ensure user is logged in
    if (!session) return res.status(401).json({ message: "Unauthorized" });

    const userId = session.user.id; // Get the user ID from the session

    // Check if the user has already liked the post
    const existingLike = await db.collection("likes").findOne({
      postId,
      userId,
    });

    if (!existingLike) {
      await db.collection("likes").insertOne({ postId, userId });
      return res.status(200).json({ message: "Liked", likes: 1 }); // Return updated likes count
    }

    return res.status(400).json({ message: "Already liked" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
