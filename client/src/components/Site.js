import React, { useEffect, Fragment, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize';
import { Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Loader from './layout/Loader'
import Nav from './layout/Nav'
import PrivateRoute from './route/PrivateRoute'
import AuthenticationRoutes from './auth/AuthenticationRoutes'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { loadUser } from '../redux/actions/authActions'


const Site = ({ auth: { isAuthenticated, user }, loadUser }) => {

  const [firstLoading, setfirstLoading] = useState(true);

  useEffect(() => {
    M.AutoInit()
    authenticate()
    // eslint-disable-next-line
  }, []);

  const authenticate = async () => {
    if (localStorage.token) {
      await loadUser()
    }
    setfirstLoading(false)

  }

  return (
    <Fragment>
      {!firstLoading ? (
        <>
          <Nav />
          <div className="container">
            <Switch>
              <PrivateRoute exact path="/" component={Home} />{
                !isAuthenticated && user === null ?
                  <AuthenticationRoutes /> :
                  <Redirect to='/' />}
            </Switch>
          </div>
        </>
      ) : <Loader />}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { loadUser })(withRouter(Site));