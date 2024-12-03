import getDB from "@/util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const db = await getDB();


            // Fetch all posts
            const generalPosts = await db.collection('posts').find().toArray();
            
            const UpdatedPosts = [];
            for (const post of generalPosts) {
                const author = await db.collection('users').findOne({ _id: new ObjectId(post.authorId) });
                UpdatedPosts.push({
                    ...post,
                    authorName: author ? author.name : null,
                });
            }

            //console.log(UpdatedPosts);
            return res.status(200).json(UpdatedPosts);

}
