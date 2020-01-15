import React, { useState } from 'react';
import { connect } from 'react-redux'
import { resetPasswordLink } from '../../redux/actions/authActions'
import M from 'materialize-css/dist/js/materialize';

const SendResetLink = ({ loading, resetPasswordLink }) => {
  const [email, setEmail] = useState('')

  const handleInput = e => setEmail(e.target.value)

  const handleSubmit = async e => {
    if (email === "") {
      M.toast({ html: "Fill all fields" })
    } else {
      e.preventDefault()
      setEmail('')
      await resetPasswordLink(email)
    }
  }

  return (
    <div className="auth">
      <h4>Type your email to send<br /> reset password link</h4>
      <form onSubmit={handleSubmit}>
        <div className="input-field"><label>Email</label><input type="text" name="email" value={email} onChange={handleInput} disabled={loading} /></div>
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

export default connect(mapStateToProps, { resetPasswordLink })(SendResetLink);