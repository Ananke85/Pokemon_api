import { useParams } from "react-router-dom";
import styles from "./blog.module.css";
import { useQuery } from "react-query";
import { getPostById } from "../../../utils/apiBlog";

const Post = () => {
  const { id } = useParams();
  const { data } = useQuery(["blogpost", id], getPostById);

  console.log("el post", data);

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
      {data && (
        <div className={styles.post}>
          <div className={styles.title}>
            <h1>{data.title}</h1>
            <h3>{formatDate(data.date)}</h3>
            <img src={data.image}></img>
          </div>

          <h2>{data.intro}</h2>

          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {specialFeatures &&
            specialFeatures.map((feature) => (
              <div key={feature.title}>
                <div className={styles.features}>
                  <h2>{feature.title}</h2>
                  {feature.image && <img src={feature.image}></img>}

                  <p>{feature.text}</p>
                </div>
              </div>
            ))}
          {data.conclusion && <h2>{data.conclusion}</h2>}
          <h3 className={styles.signature}>{data.signature}</h3>
        </div>
      )}
    </>
  );
};

export default Post;
