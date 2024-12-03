import { useState } from "react";

const FeedCommentSection = ({ postId, comments }) => {
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState(comments);

  const handleCommentSubmit = async () => {
    const res = await fetch(`/api/feed/comments`, {
      method: "POST",
      body: JSON.stringify({ postId, content: newComment }),
      headers:{"Content-Type":"application/json"}
    });

    const data = await res.json();
    setCommentList((prevComments) => [...prevComments, data.comment]);
    setNewComment(""); // Clear the input field
  };

  return (
    <div>
      <h3>Comments:</h3>
      {commentList.map((comment) => (
        <div key={comment._id}>
          <p>{comment.content}</p>
        </div>
      ))}
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleCommentSubmit}>Submit</button>
    </div>
  );
};

export default FeedCommentSection