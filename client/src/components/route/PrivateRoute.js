import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/authActions'

const PrivateRoute = ({ auth: { isAuthenticated, loading, user }, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => isAuthenticated && !loading && user !== null ? (
      <Component {...props} />
    ) : (
        <Redirect to="/login" />
      )} />
  )
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(PrivateRoute)