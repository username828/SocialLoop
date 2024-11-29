import getDB from "@/util/mongodb";
import { MongoClient } from "mongodb";

export default async function handler(req,res){
    const db=await getDB()

    if(req.method==='POST'){
        const {username,email}=req.body
        return res.status(201).json({message:"User created"});
        await db.collections('users').insertOne({username, email})
    }
    //GET
    else{
        //reading
        const generalPosts=await db.collection('generalPosts').find().toArray()
        console.log(generalPosts)
       
        return res.status(200).json(generalPosts);
    }


    
   

    
}