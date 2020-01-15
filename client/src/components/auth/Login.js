import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser, loadUser, resendEmail } from '../../redux/actions/authActions'
import M from 'materialize-css/dist/js/materialize';

const Login = ({ auth: { loading, emailToResend }, loginUser, loadUser, resendEmail }) => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const { email, password } = user

  const handleInput = e => setUser({
    ...user,
    [e.target.name]: e.target.value
  })

  const handleSubmit = async e => {
    e.preventDefault()
    if (email === "" || password === "") {
      M.toast({ html: "Fill all fields" })
    } else {
      setUser({
        email: '',
        password: '',
      })
      await loginUser(user)
      await loadUser()
    }
  }

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-field"><label>Email</label><input type="text" name="email" value={email} onChange={handleInput} disabled={loading} /></div>
        <div className="input-field"><label>Password</label><input type="password" name="password" value={password} onChange={handleInput} disabled={loading} /></div>
        <button className="btn waves-effect waves-light" type="submit" disabled={loading}>Log in
          <i className="material-icons right">send</i>
        </button>
        {emailToResend !== null ? <div onClick={() => resendEmail(emailToResend)}>Resend email</div> : null}
        {!loading ? <Link to="/reset">Did you forget password?</Link> : null}
      </form>

    </div>
  )
};

const mapStateToProps = state => ({
  auth: state.auth
})


export default connect(mapStateToProps, { loginUser, loadUser, resendEmail })(Login);