import getDB from "@/util/mongodb";

export default async function handler(req, res) {
  const db = await getDB();

  if (req.method === "POST") {
    const { postId, content } = req.body;

    // Ensure user is logged in
    const session = await getSession({ req });
    if (!session) return res.status(401).json({ message: "Unauthorized" });

    const userId = session.user.id;

    const comment = {
      postId,
      authorId: userId,
      content,
      createdAt: new Date(),
    };

    // Insert the comment into the database
    await db.collection("comments").insertOne(comment);

    return res.status(201).json({message:"Comment added"});
  }

  return res.status(405).json({ message: "Method not allowed" });
}
