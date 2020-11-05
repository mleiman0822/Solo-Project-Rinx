import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { Navbar, NavLink } from "react-bootstrap";
import SportsHockeyIcon from "@material-ui/icons/SportsHockey";

const Nav = (props) => {
  let loginLinkData = {
    path: "/login",
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="navbar-default">
        <Navbar.Brand href="#home">
          <SportsHockeyIcon />
          RINX{" "}
        </Navbar.Brand>

        <NavLink className="nav-link" href={loginLinkData.path}>
          {loginLinkData.text}
          {props.store.user.id && (
            <>
              {""}
              {""}
              <NavLink className="nav-link" href="#rinks">
                Rinks
              </NavLink>
              <NavLink className="nav-link" href="#favorites">
                Favorites
              </NavLink>
              <NavLink className="nav-link" href="#weather">
                Weather
              </NavLink>

              {props.store.user.is_admin && (
                <NavLink className="nav-link" href="#admin">
                  Admin
                </NavLink>
              )}
            </>
          )}
        </NavLink>
        <LogOutButton className="nav-link-logout" />
      </Navbar>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
