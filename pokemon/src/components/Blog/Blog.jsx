import { useQuery } from "react-query";
import styles from "./blog.module.css";
import { getAllPosts } from "../../../utils/apiBlog";
import { Link } from "react-router-dom";
import { useState } from "react";

const Blog = () => {
  const { data: posts } = useQuery(["blogpost"], getAllPosts);

  console.log("los posts", posts);

  const dates = posts && posts.map((post) => post.date);
  const limit = 6;
  const [postsCount, setpostsCount] = useState(6);

  const showMore = () => {
    setpostsCount((prevCount) => prevCount + limit);
  };

  const showLess = () => {
    setpostsCount((prevCount) => prevCount - limit);
  };
  const visiblePosts = posts?.slice(0, postsCount);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDates =
    dates &&
    dates.map((date) => {
      const dateObj = new Date(date);
      const day = dateObj.getDate();
      const dayWithSuffix =
        day + (day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th");
      const formattedDate = dateObj.toLocaleDateString("en-US", options);
      return formattedDate.replace(day.toString(), dayWithSuffix);
    });

  return (
    <>
      <div className={styles.blog}>
        {posts &&
          visiblePosts.map((post, index) => (
            <div key={post._id} className={styles.blogCard}>
              <h2>{post.title}</h2>
              <h4>{formattedDates[index]}</h4>
              <img src={post.image}></img>
              <h3>{post.intro}</h3>

              <Link
                to={`/blog/${post._id}/${encodeURIComponent(
                  post.title.toLowerCase().replace(/\s+/g, "-")
                )}`}
              >
                <button>GO!</button>
              </Link>
            </div>
          ))}

        <div className={styles.loadingButtons}>
          {posts && posts.length > limit && postsCount < posts.length && (
            <button onClick={showMore} className={styles.view}>
              <span
                // onClick={handleNextCard}
                className="icon-point-right"
              ></span>
              LOAD MORE
            </button>
          )}
          {posts && postsCount > limit && (
            <button onClick={showLess} className={styles.view}>
              <span
                // onClick={handlePreviousCard}
                className="icon-point-left"
              ></span>
              LOAD LESS
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
