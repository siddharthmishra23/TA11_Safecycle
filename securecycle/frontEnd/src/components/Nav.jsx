import { NavLink as RRNavLink } from "react-router-dom"; // Rename to avoid conflict
import { Nav, NavItem, NavLink } from "reactstrap";
import styles from "./Nav.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function Navigation() {
  return (
    <Nav className={styles.nav}>
      <NavItem>
        <NavLink tag={RRNavLink} exact to="/" activeClassName="active">
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RRNavLink} to="/travel" activeClassName="active">
          Travel
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RRNavLink} to="/resources" activeClassName="active">
          Resources
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RRNavLink} to="/aboutus" activeClassName="active">
          About us
        </NavLink>
      </NavItem>
    </Nav>
  );
}

export default Navigation;
