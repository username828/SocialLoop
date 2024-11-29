import getDB from "@/util/mongodb"
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req,res) {

    if(req.method==="GET"){

        const {uid}=req.query //user's id--the one following
        
        const db=await getDB()

        const following=await db.collection('following').find({followerId:uid}).toArray()
        console.log(following)
        if(following){
        
            return res.status(200).json(following)
        }
        else{
            return res.status(400).json({message:"Not following"})
        }
        
    }
    
}