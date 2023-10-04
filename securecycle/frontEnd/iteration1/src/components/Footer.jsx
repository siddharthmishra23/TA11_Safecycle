import styles from "./Footer.module.css";
import {Link} from "react-router-dom";
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
      <div className={styles.instance}>
          <Link to="/iteration2/home">
            Iteration 2
          </Link>
          <Link to="/">
            Iteration 3
          </Link>
        </div>
        <div className={styles.item}>
          © 2023 Coding Parlour. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
