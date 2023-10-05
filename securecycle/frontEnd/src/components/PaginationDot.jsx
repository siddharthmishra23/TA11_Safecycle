import styles from "./CardNews.module.scss";
const PaginationDots = ({ activeIndex, totalPosts }) => {
  return (
    <div className={styles["pagination-dots"]}>
      {Array.from({ length: totalPosts }).map((_, index) => (
        <div
          key={index}
          className={`${styles["dot"]} ${
            index === activeIndex ? styles["active-dot"] : ""
          }`}
        ></div>
      ))}
    </div>
  );
};
export default PaginationDots;
