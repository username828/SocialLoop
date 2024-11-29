import { useState,useEffect } from "react"
export default function Comment(props){

    const pid=props.pid
    console.log("pid in Comments",pid)
    const [comments,setComments]=useState([])
    const [loading,setLoading]=useState(true)
    const [showComments,setShowComments]=useState(false)
    function toggleComments(){
        setShowComments(prevState => !prevState)
    }

    useEffect(()=>{
        async function fetchComments() {
            const res=await fetch(`http://localhost:3000/api/comments/${pid}`);
            const data=await res.json()
            setComments(data.comments || [])

            setLoading(false);
        }
        fetchComments()
    },[pid])

    if(loading){
        return <p>Loading...</p>
    }

    return(
        <>

        <button onClick={toggleComments}>{showComments?"Show Comments":"Hide Comments"}</button>
        {  
            showComments &&
            comments.map(comment=>{
                <li key={comment._id}>{comment.content}</li>
            })
        }
        
        </>

    )
}