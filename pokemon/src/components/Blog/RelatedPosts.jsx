import { useQuery } from "react-query";
import styles from "./blog.module.css";
import { getAllPosts } from "../../../utils/apiBlog";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const RelatedPosts = () => {
  const id = useParams().id;
  const { data: posts } = useQuery(["blogpost"], getAllPosts);

  const relatedPosts =
    posts && posts.filter((post) => post._id !== id.toString());

  const [currentIndex, setCurrentIndex] = useState(0);
  const postsPerPage = 3;

  const handleNext = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex + 3 >= relatedPosts.length ? 0 : currentIndex + 3
    );
  };
  const handlePrevious = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex - 3 < 0
        ? relatedPosts.length - 1 - ((relatedPosts.length - 1) % 3)
        : currentIndex - 3
    );
  };

  const displayedPosts =
    relatedPosts &&
    relatedPosts.slice(currentIndex, currentIndex + postsPerPage);

  return (
    <>
      <div className={styles.relatedContainer}>
        <h1>Related PokéNews</h1>
        <div className={styles.container}>
          <button
            onClick={handlePrevious}
            className={
              relatedPosts && (relatedPosts.length <= postsPerPage || currentIndex === 0)
                ? `${styles.disabled}`
                : styles.active
            }
          >
            <span className="icon-point-left"></span>
          </button>
          <div className={styles.related}>
            {posts &&
              displayedPosts.map((post) => (
                <div key={post._id} className={styles.postito}>
                  <Link
                    to={`/pokenews/${post._id}/${encodeURIComponent(
                      post.title.toLowerCase().replace(/\s+/g, "-")
                    )}`}
                  >
                    <h3>{post.title}</h3>
                  </Link>
                </div>
              ))}
          </div>

          <button
            onClick={handleNext}
            className={
              relatedPosts && (relatedPosts.length <= postsPerPage ||
                currentIndex + postsPerPage >= relatedPosts.length)
                ? `${styles.disabled}`
                : styles.active
            }
          >
            <span className="icon-point-right"></span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RelatedPosts;
