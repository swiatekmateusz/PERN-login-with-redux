import React, { useState } from 'react';
import { connect } from 'react-redux'
import { registerUser } from '../../redux/actions/authActions'
import M from 'materialize-css/dist/js/materialize';

const Register = ({ loading, registerUser }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = user

  const handleInput = e => setUser({
    ...user,
    [e.target.name]: e.target.value
  })

  const handleSubmit = async e => {
    e.preventDefault()
    if (password !== password2) {
      M.toast({ html: "Passwords doesn't match" })
    } else if (name === "" || email === "" || password === "" || password2 === "") {
      M.toast({ html: "Fill all fields" })
    } else {
      setUser({
        name: '',
        email: '',
        password: '',
        password2: '',
      })
      await registerUser(user)
    }
  }

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="input-field">
          <label>Name</label>
          <input type="text" name="name" value={name} onChange={handleInput} disabled={loading} />
        </div>
        <div className="input-field">
          <label>Email</label>
          <input type="text" name="email" value={email} onChange={handleInput} disabled={loading} />
        </div>
        <div className="input-field">
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={handleInput} disabled={loading} />
        </div>
        <div className="input-field">
          <label>Retype password</label>
          <input type="password" name="password2" value={password2} onChange={handleInput} disabled={loading} />
        </div>
        <button className="btn waves-effect waves-light" type="submit" disabled={loading}>Register
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.auth.loading
})

export default connect(mapStateToProps, { registerUser })(Register);