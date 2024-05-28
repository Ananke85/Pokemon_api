// import { useQuery } from "react-query";
// import { getAllPosts } from "../../../utils/apiBlog";
import styles from "./blog.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import Spinner from "../Spinner/Spinner";
import postsData from "../../data/posts.json"

const Blog = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    setPosts(postsData)
  }, [])


  //To use if data is hosted on mongoDB
  // const { data: posts, isLoading } = useQuery(["blogpost"], getAllPosts);


  const dates = posts?.map((post) => post.date);
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
      {/* {isLoading && <Spinner />} */}
      {/* {!isLoading && ( */}
        <>
          <div className={styles.blogContainer}>
            <h1>PokéNews</h1>
            <div className={styles.blog}>
              {posts &&
                visiblePosts.map((post, index) => (
                  <div key={post._id} className={styles.blogCard}>
                    <h5>{post.title}</h5>
                    <p>{formattedDates[index]}</p>
                    <img src={post.image}></img>
                    <p className={styles.intro}>{post.intro}</p>

                    <Link
                      to={`/pokenews/${post._id}/${encodeURIComponent(
                        post.title.toLowerCase().replace(/\s+/g, "-")
                      )}`}
                    >
                      <button>GO!</button>
                    </Link>
                  </div>
                ))}
            </div>
            <div className={styles.loadingButtons}>
              {posts && posts.length > limit && postsCount < posts.length && (
                <button onClick={showMore} className={styles.view}>
                  LOAD MORE
                </button>
              )}
              {posts && postsCount > limit && (
                <button onClick={showLess} className={styles.view}>
                  LOAD LESS
                </button>
              )}
            </div>
          </div>
        </>
      {/* )} */}
    </>
  );
};

export default Blog;
