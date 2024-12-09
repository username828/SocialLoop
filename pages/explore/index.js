import PostDetails from "@/components/Posts/PostDetails";
import PostsSearch from "@/components/Posts/PostSearch";
export default function ExplorePage({ posts }) {
 
  return (
    <div style={{textAlign:"center",fontFamily:"cursive"}}>
      <h1>Explore Posts</h1>
      <PostsSearch/>
      {

        posts.map(post=>{
          
          return <PostDetails key={post._id} title={post.title} author={post.authorName} content={post.content} image={post.image} date={post.date}/>
  
        })
      }
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/general-posts');
  const posts = await res.json();

  if(!posts){
    return {
      notFound: true, 
    };
  }
  return {
    props: {
      posts,
    },
    revalidate: 60, 
  };
  

  
}
