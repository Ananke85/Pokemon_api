// import { useQuery } from "react-query";
// import { getAllPosts } from "../../../utils/apiBlog";
import styles from "./blog.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import postsData from "../../data/posts.json"

// eslint-disable-next-line react/prop-types
const RelatedPosts = () => {

  //To use if data is hosted on mongoDB
  // const id = useParams().id;
  // const { data: posts } = useQuery(["blogpost"], getAllPosts);

  // const relatedPosts =
  //   posts && posts.filter((post) => post._id !== id.toString());


  const {index} = useParams()
  const [data, setData] = useState([])
  const [relatedPosts, setRelatedPosts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const postsPerPage = 3;

  //only if data is in json
  useEffect(() => {
    const post = postsData[index]
    setData(post)
    const filteredPosts = postsData.filter((_, idx) => idx != parseInt(index))
    setRelatedPosts(filteredPosts)
  }, [index])



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
    relatedPosts?.slice(currentIndex, currentIndex + postsPerPage);

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

  return (
    <>
      <div className={styles.relatedContainer}>
        <h4>Related PokéNews</h4>
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
            {data &&
              displayedPosts.map((post, index) => (
                <div key={index} className={styles.postito}>
                  <Link
                    to={`/pokenews/${postsData.indexOf(post)}/${encodeURIComponent(
                      post.title.toLowerCase().replace(/\s+/g, "-")
                    )}`}
                    onClick={scrollToTop}
                  >
                    <p>{post.title}</p>
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
