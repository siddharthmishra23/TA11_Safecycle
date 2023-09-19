import { NavLink as RRNavLink, Link } from "react-router-dom"; // Rename to avoid conflict
import { Nav, NavItem, NavLink } from "reactstrap";
import styles from "./Nav.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function Navigation() {
  return (
    <Nav className={styles.nav}>
      <div className={styles["logo-flex"]}>
        <Link to="/">
          <img src="/new_logo.png" alt="Safe cycle" className={styles.logo} />
        </Link>
      </div>

      <div className={styles.navflex}>
        <NavItem>
          <NavLink tag={RRNavLink} exact to="/" activeClassName="active">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to="/travel" activeClassName="active">
            Hazard Spotter
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to="/resources" activeClassName="active">
            Pedalpedia
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to="/aboutus" activeClassName="active">
            About us
          </NavLink>
        </NavItem>
      </div>
    </Nav>
  );
}

export default Navigation;
