import { useState } from "react";
import Button from "../ui/Button";
import { useRouter } from "next/router";
import NewPost from "../Posts/NewPost";
import styles from "./Profile.module.css"; // Import the stylesheet

export default function Profile(props) {

  return (
    <div>

      <h2 className={styles.profileTitle}>Welcome {props.name}</h2>

      {/* <div className={styles.cardContainer}>
        <div className={styles.card}>
          <Button className={styles.cardButton} onClick={navigateToPosts}>
            View My Posts
          </Button>
        </div>

        <div className={styles.card}>
          <Button className={styles.cardButton} onClick={navigateToFeed}>
            View My Feed
          </Button>
        </div>

        <div className={styles.card}>
          <Button className={styles.cardButton} onClick={navigateToFollowing}>
            View Following
          </Button>
        </div>

        <div className={styles.card}>
          <Button className={styles.cardButton} onClick={toggleNewPost}>
            {newPost ? "Cancel" : "Create Post"}
          </Button>
        </div>
      </div>

      {newPost && <NewPost pid={props.pid} />} */}

    </div>
  );
}
