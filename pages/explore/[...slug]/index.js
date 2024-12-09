import { useRouter } from "next/router";
import useSWR from "swr";
import { useState , useEffect} from "react";
import PostList from "@/components/Posts/PostList";

 function FilteredPostsPage(props) {
  const [posts,setPostsState]=useState();
  const r=useRouter();
  const paramData=r.query.slug;
  const fetcher=(url)=>fetch(url).then(res=>res.json())
  const {data,error}=useSWR("http://localhost:3000/api/general-posts",fetcher)
  useEffect(()=>{
    if(data)
    {
      const posts=[]
        for(const key in data)
        {
            posts.push({
                id:key,
                ...data[key]
            })
        }
        setPostsState(posts)
    }
  },[data])
  
  if(!posts)
  {
    return <p>Loading...</p>
  }
  const year=Number(paramData[0]);
  const month=Number(paramData[1]);

  const filteredPosts=posts.filter((post) => {
    const postDate = new Date(post.date);
    return postDate.getFullYear() === year && postDate.getMonth() === month - 1;
  });

  
  if(isNaN(year)|| isNaN(month) || error)
      {
        return <p>Invalid year or month</p>
      }

  if(!filteredPosts||filteredPosts.length===0)
  {
    return <p>Post not Found</p>
  }
    return (
      
        <div style={{textAlign:"center",fontFamily:"cursive"}}>
          <h1>Filtered Posts Page</h1> 
          <PostList list={filteredPosts}/>
        </div>
      
    );
  }

  export default FilteredPostsPage;