import styles from "./Aboutus.module.css";
import Nav from "../components/Nav";

function Aboutus() {
  return <div>
    <Nav />
    <div className={styles["about"]}>About us</div>
    </div>
}

export default Aboutus;
