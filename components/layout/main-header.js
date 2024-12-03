import Link from "next/link";
import styles from './main-header.module.css';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Header(){
    const {data:session,status:loading}=useSession();
    const router=useRouter()
    function handleLogOut(){
        signOut()
    }

    function navigateToProfile(){
        router.push(`/profile/${session.user.id}`)
    }
    return(
       <header className={styles.header}>
        <div className={styles.logo}>
            <Link href='/'>Social Loop</Link>
        </div>
        <nav className={styles.navigation}>
            <ul>
                <li>
                    <Link href='/explore'>Explore</Link>    
                </li>
                <li>
                    {!session &&
                        <Link href='/auth'>Login</Link>
                    }
                    
                </li>

                <li>
                    {session &&
                    <button onClick={navigateToProfile}>Profile</button>
                    }
                </li>

                <li>
                    {session &&
                    <button onClick={handleLogOut}>Logout</button>
                    }
                </li>
            </ul>
        </nav>
       </header>
    )
}