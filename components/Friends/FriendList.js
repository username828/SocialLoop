import { useEffect, useState } from 'react';
import { useUser } from '@/store/UserContext'; // Assuming UserContext.js is in the context directory
import Friend from './Friend';
import styles from './FriendList.module.css'

export default function FollowingList(props) {
    
    return (
      
        <div className={styles.list}>
          <ul>
          {
            props.list.map(user=>{
                return <Friend name={user.name} bio={user.bio}/>
            })
          }
          </ul>
        </div>
      
    );
}
