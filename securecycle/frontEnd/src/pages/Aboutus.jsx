import styles from "./Aboutus.module.css";
import Nav from "../components/Nav";

function Aboutus() {
  return <div>
    <Nav />
        <header class={styles["aboutus"]}>

        <div className={styles["team"]}>
        <img src="/teambig.png" alt="" /></div>

        <div class={styles["header-text"]}>
          <h1>
            
            <span>About Us</span>
          </h1>
          <br />
          <p>Welcome to Secure Cycling, your dedicated platform committed to enhancing the safety and security of cyclists worldwide. Our mission is to create a safer cycling environment by providing valuable resources, innovative products, and a supportive community that empowers cyclists to ride with confidence.</p>
          <br />
          <h2>Our Commitment to Cyclists' Safety</h2>
          <br />
          <p>At Secure Cycling, we recognize the importance of cyclist safety on the road. Whether you're a seasoned cyclist or just starting out, we believe that every pedal stroke should be accompanied by peace of mind. Our team of cycling enthusiasts and safety advocates have come together to address the unique challenges that cyclists face and offer effective solutions.</p>
        </div>
        {/* <div class={styles["description"]}>
          <p>This is an example of a full screen video being shown as a background at any screen size. 
            This is accomplished with giving video absolute positioning, full viewport width and height, and using 'object-fit: cover;'
          </p>
        </div> */}
        </header>
    </div>
}

export default Aboutus;
