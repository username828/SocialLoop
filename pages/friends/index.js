import FollowingList from "@/components/Friends/FriendList";
export default function UsersPage(props) {
    const arr=props.allUsers;
    return (
        <div style={{textAlign:"center",fontFamily:"cursive"}}>
            <h1>All Users Page</h1>
            <FollowingList list={arr}/> 
        </div>
    );
}

export async function getStaticProps(){
    const res=await fetch('http://localhost:3000/api/users');
    const all=await res.json()
    return{
      props:{
        allUsers:all
      }
    }
  }
