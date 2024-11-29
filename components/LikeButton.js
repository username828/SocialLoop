import {useState} from "react"

export default function LikeButton({postId,userId,initialLiked}){
    const [liked,setLiked]=useState(initialLiked);
    const [likeCount,setLikeCount]=useState(0);

    const toggleLike=async()=>{
        const res=await fetch('http://localhost:3000/api/likes',{

            method: liked ? "DELETE" : "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({postId,userId})
        })

        const data=await res.json();
        setLiked(!liked)
        setLikeCount(data.likeCount || likeCount)
    }

    return(
        <button onClick={toggleLike}>
            {liked ? "Unlike":"Like"} {likeCount > 0 && `${likeCount}`}
        </button>
    )
}