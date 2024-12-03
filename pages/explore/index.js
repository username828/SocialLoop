
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

// This function fetches the data at build time and enables ISR for the page
export async function getStaticProps() {
  try {
    // Fetch posts from your API or database
    const res = await fetch('http://localhost:3000/api/general-posts');
    const posts = await res.json();

    // Return the fetched posts as props to the page
    return {
      props: {
        posts,
      },
      // This will regenerate the page after 60 seconds
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      notFound: true, // In case there’s an error fetching posts
    };
  }
}
