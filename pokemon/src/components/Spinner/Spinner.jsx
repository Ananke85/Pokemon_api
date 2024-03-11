import styles from "./spinner.module.css";

const Spinner = () => {
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.pokeball}></div>
        <div className={styles.mini}></div>
      </div>
    </>
  );
};

export default Spinner;
