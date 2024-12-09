import * as formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import getDB from "@/util/mongodb";

// For adding new post and handling file uploads using formidable
export const config = {
  api: {
    bodyParser: false,  // Disable body parser to use formidable for file uploads
  },
};

export default async function handler(req, res) {
  const { pid } = req.query;
  const db = await getDB(); 

  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'public/images');  
    form.keepExtensions = true;  

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "File upload failed" });
      }

      // Ensure fields are strings (could be an array of strings in case of multiple fields with same name)
      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
      const content = Array.isArray(fields.content) ? fields.content[0] : fields.content;

      // Handle file upload and image path
      const imagePath = files.file ? `/images/${files.file[0].newFilename}` : null;


      if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required." });
      }

      try {
        const newPost = {
          title,
          content,
          authorId: pid,  
          image: imagePath,  
          date: new Date(), 
        };


        const result = await db.collection("posts").insertOne(newPost);

        return res.status(201).json({message: "Post created successfully"});
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
      }
    });
  } 
  else 
  {
    const posts = await db.collection("posts").find({ authorId: pid }).toArray();
    if (!posts || posts.length === 0) {
        return res.status(404).json({ message: "No posts found for this user." });
    }
    return res.status(200).json(posts);
   }
}
