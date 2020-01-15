import React, { useEffect, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import ConfirmEmail from '../services/ConfirmEmail'
import SendResetLink from '../services/SendResetLink'
import ResetPassword from '../services/ResetPassword'
import M from 'materialize-css/dist/js/materialize';
import { connect } from 'react-redux'
import { clearInfos, clearRedirect } from '../../redux/actions/authActions'
import Loader from '../layout/Loader'

const AuthenticationRoutes = ({ auth: { error, alert, loading, redirect }, clearInfos, history, clearRedirect }) => {

  useEffect(() => {
    if (redirect) {
      history.push('/login')
    }
    clearRedirect()
    // eslint-disable-next-line
  }, [history.length, redirect]);

  useEffect(() => {
    if (alert && Array.isArray(alert)) {
      alert.forEach(alert => M.toast({ html: alert }))
      clearInfos()
    } else if (alert) {
      M.toast({ html: alert })
      clearInfos()
    }
    // eslint-disable-next-line
  }, [alert]);

  useEffect(() => {
    if (error && Array.isArray(error)) {
      error.forEach(error => M.toast({ html: error }))
      clearInfos()
    } else if (error) {
      M.toast({ html: error })
      clearInfos()
    }
    // eslint-disable-next-line
  }, [error]);

  return (
    <Fragment>
      <>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/confirm/:token" component={ConfirmEmail} />
        <Route exact path="/reset" component={SendResetLink} />
        <Route exact path="/reset/:token" component={ResetPassword} />
        {loading ? <Loader /> : null}
      </>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { clearInfos, clearRedirect })(withRouter(AuthenticationRoutes));