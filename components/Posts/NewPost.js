import {useState} from 'react';

export default function NewPost(props){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const authorId=props.pid;

    const handleSubmit=async(e)=>{
        e.preventDefault()

        const response = await fetch(`http://localhost:3000/api/posts/${props.pid}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content, authorId }),
        });
      
        const data = await response.json();

        if (response.ok) {
            alert("Post created successfully!");
            setTitle("");
            setContent("");
        } 
    }

    return(
        <>    
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Create Post</button>
        </form>
            
        
        </>
    )
}