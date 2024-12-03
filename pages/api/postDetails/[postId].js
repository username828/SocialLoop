import getDB from "@/util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const db = await getDB();

    const { postId } = req.query;

    if (req.method === "GET") {

        const post = await db.collection("posts").findOne({ _id: new ObjectId(postId) });
        

        const likes = await db.collection("likes").find({ postId }).toArray();
        

        const comments = await db.collection("comments").find({ postId }).toArray();


        const commentAuthors = await Promise.all(
            comments.map(async (comment) => {

                console.log(comment.authorId)
                const user = await db.collection("users").findOne({ _id: new ObjectId(comment.authorId) });
                console.log(user)
                return {
                    ...comment,
                    authorName: user ? user.name : "Unknown",
                };
            })
        );

        // post Details append all
        const postDetail = {
            ...post,
            likesCount: likes.length,
            likes: likes.map((like) => ({
                authorId: like.authorId,
                createdAt: like.createdAt,
            })),
            comments: commentAuthors.map((comment) => ({
                content: comment.content,
                authorId: comment.authorId,
                authorName: comment.authorName, 
                createdAt: comment.createdAt,
            })),
        };

        return res.status(200).json(postDetail);
    }
}
