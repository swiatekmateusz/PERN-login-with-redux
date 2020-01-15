import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { checkToken, resetPassword } from '../../redux/actions/authActions'
import M from 'materialize-css/dist/js/materialize';

const ResetPassword = ({ loading, checkToken, resetPassword, match }) => {
  const [passwords, setPasswords] = useState({
    password: '',
    password2: ''
  })

  const { password, password2 } = passwords

  const token = match.params.token

  useEffect(() => {
    checkToken(token)
    // eslint-disable-next-line
  }, []);

  const handleInput = e => setPasswords({
    ...passwords,
    [e.target.name]: e.target.value
  })

  const handleSubmit = async e => {
    e.preventDefault()
    if (password !== password2) {
      M.toast({ html: "passwords doesnt match" })
    } else if (password === "" || password2 === "") {
      M.toast({ html: "Fill all fields" })
    } else if (password.length < 6) {
      M.toast({ html: "Minimum password length is 6" })
    } else {
      setPasswords({
        password: '',
        password2: ''
      })
      await resetPassword(password, token)
    }

  }
  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h4>Reset password</h4>
        <div className="input-field"><label>Password</label><input type="password" name="password" value={password} onChange={handleInput} disabled={loading} /></div>
        <div className="input-field"><label>Retype password</label><input type="password" name="password2" value={password2} onChange={handleInput} disabled={loading} /></div>
        <button className="btn waves-effect waves-light" type="submit" disabled={loading}>Submit
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>

  );
}

const mapStateToProps = state => ({
  loading: state.auth.loading
})

export default connect(mapStateToProps, { checkToken, resetPassword })(ResetPassword);