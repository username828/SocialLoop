import getDB from "@/util/mongodb"
import bcrypt from 'bcrypt'
export default async function handler(req,res){
    if(req.method==='POST'){

        const data=req.body
        const email=data.email
        const name=data.name

        const password=data.password
        const hashedPassword = await bcrypt.hash(password, 10);

        const db=await getDB();

        await db.collection("users").insertOne({
            name: name,
            email: email,
            password: hashedPassword,
        });
    
        res.status(201).json({ message: "User created successfully." });
    }
}