import { useParams } from "react-router-dom";
import styles from "./blog.module.css";
// import { useQuery } from "react-query";
// import { getPostById } from "../../../utils/apiBlog";
import RelatedPosts from "./RelatedPosts";
import Spinner from "../Spinner/Spinner";
import postsData from "../../data/posts.json";
import { useEffect, useState } from "react";

const Post = () => {
  //To use if data is hosted on mongoDB
  // const { id } = useParams();
  // const { data, isLoading } = useQuery(["blogpost", id], getPostById);

  const { index } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const post = postsData[index];
    setData(post);
    setIsLoading(false);
  }, [index]);

  const specialFeatures = data && data.special_features;
  const formatDate = (date) => {
    if (data && data.date) {
      const dateObj = new Date(date);
      const day = dateObj.getDate();
      const dayWithSuffix =
        day + (day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th");
      return dateObj
        .toLocaleDateString("en-US", options)
        .replace(day.toString(), dayWithSuffix);
    }
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let paragraphs = [];
  if (data && data.text) {
    const splitText = data.text.split(". ");
    let currentParagraph = "";

    for (let i = 0; i < splitText.length; i++) {
      currentParagraph += splitText[i] + ". ";
      if (i % 2 === 1) {
        paragraphs.push(currentParagraph);
        currentParagraph = "";
      }
    }

    if (currentParagraph.trim() !== "") {
      paragraphs.push(currentParagraph.trim());
    }
  }

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {data && (
            <div className={styles.postContainer}>
              <div className={styles.post}>
                <div className={styles.title}>
                  <h2>{data.title}</h2>
                  <p>{formatDate(data.date)}</p>
                  <img src={data.image} alt="Post Image" />
                </div>

                <h4>{data.intro}</h4>

                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}

                {specialFeatures &&
                  specialFeatures.map((feature, index) => (
                    <div key={index} className={styles.features}>
                      <h5>{feature.title}</h5>
                      {feature.image && (
                        <div className={styles.picColumn}>
                          <img src={feature.image} alt="Feature Image" />
                          <p>{feature.text}</p>
                        </div>
                      )}
                    </div>
                  ))}

                {data.conclusion && <p>{data.conclusion}</p>}
                <p className={styles.signature}>{data.signature}</p>
                <div className={styles.thanks}>
                  <p>
                    Special thanks to{" "}
                    <a
                      href="https://www.pokemon.com/us"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      pokemon.com
                    </a>{" "}
                    for providing this Pokénew
                  </p>
                </div>
              </div>
            </div>
          )}

          {data && <RelatedPosts data={data} />}
        </>
      )}
    </>
  );
};

export default Post;
