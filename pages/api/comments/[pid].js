import getDB from "@/util/mongodb";

export default async function handler(req,res){

    
    if(req.method==="GET"){ 
        const db=await getDB()
        const {pid}=req.query

        console.log("pid in API",pid)

        const comments=await db.collection("comments").find({ postId: pid }).toArray();
        return res.status(200).json(comments)
    }
}