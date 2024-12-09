import { useState } from "react";
import styles from "./NewPost.module.css";

export default function NewPost(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const authorId = props.pid;

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("authorId", authorId);
    if (image) {
      formData.append("file", image);
    }

    const response = await fetch(`/api/posts/${props.pid}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data) {
      alert("Post created successfully!");
      setTitle("");
      setContent("");
      setImage(null);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="file">Upload Image:</label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Create Post
        </button>
      </form>
    </div>
  );
}
