import { useState } from "react";
import Button from "../ui/Button";
import Friend from "../Friends/Friend";

export default function Profile(props) {
    console.log(props.pid)
    const followerId = props.pid;
    console.log(followerId)
    // const [clicked, setClicked] = useState(false);
    // const [following, setFollowing] = useState([]);  // State to store following data

    // const handleFollowing = async () => {
    //     if (!followerId) {
    //         alert("Please log in to follow users.");
    //         return;
    //     }
        
    //     // Make the fetch request to get the following data
    //     const res = await fetch(`http://localhost:3000/api/followers/${followerId}`);
    //     const data = await res.json(); // returns following array
        
    //     // Update state with the following data
    //     setFollowing(data.following);
    //     setClicked(true); // Set clicked to true to display following list
    // };

    return (
        <>
            <h2>{props.name}</h2>
            <h3>{props.bio}</h3>
            
            {/* <Button lnk="/posts">View My Posts</Button>
            <Button onClick={handleFollowing} lnk="/friends">View Following</Button> */}

            {/* {clicked && following.length > 0 && (
                <div>
                    <h3>Following List:</h3>
                    {following.map(friend => (
                        <Friend key={friend._id} friend={friend} />
                    ))}
                </div>
            )} */}
        </>
    );
}
