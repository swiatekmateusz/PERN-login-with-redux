import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/authActions'
import M from 'materialize-css/dist/js/materialize';

const Nav = ({ auth: { isAuthenticated }, logout }) => {

  useEffect(() => {

    const elem = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elem);
  }, []);

  const navLinksGuest = (
    <Fragment>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </Fragment>
  )
  const navLinkUser = (
    <Fragment>
      <li>
        <a onClick={() => logout()} href="#!">Logout</a>
      </li>
    </Fragment>
  )

  return (
    <Fragment>
      <nav>
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo">Logo</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {isAuthenticated ? navLinkUser : navLinksGuest}
          </ul>
          <ul id="slide-out" className="sidenav">
            {isAuthenticated ? navLinkUser : navLinksGuest}
            <li><a className="sidenav-close" href="#!">Close</a></li>
          </ul>
          <a href="#!" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        </div>
      </nav>
    </Fragment>
  )
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Nav)