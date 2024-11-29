import getDB from "@/util/mongodb";

export default async function handler(req,res){
    const {postId,userId}=req.body;

    const db=await getDB()

    if(req.method==="POST"){

        //already liked

        const liked=await db.collection('likes').findOne({postId,userId})
        if(liked){
            return res.status(400).json({message:"Already liked the post"})
        }

        //like

        await db.collection('likes').insertOne({postId,userId,createdAt:new Date()})
        const likeCount = await db.collection('likes').countDocuments({ postId });
        res.status(200).json({ message: "Liked", likeCount });
    }

    else if (req.method==="DELETE"){
        await db.collection('likes').deleteOne({postId,userId})
        const likeCount = await db.collection('likes').countDocuments({ postId });
        res.status(200).json({ message: "Unliked", likeCount });
    }

    else if (req.method==="GET"){
        if (postId) {
            const likeCount = await db.collection("likes").countDocuments({ postId });
            return res.status(200).json({ postId, likeCount });
        } else if (userId) {
            const likedPosts = await db.collection("likes").find({ userId }).toArray();
            return res.status(200).json({ userId, likedPosts });
        }
    }
}