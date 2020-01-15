import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { confirmEmail } from '../../redux/actions/authActions'

const ConfirmEmail = ({ confirmEmail, match }) => {

  const token = match.params.token
  useEffect(() => {
    confirmEmail(token)
    // eslint-disable-next-line
  }, []);

  return (
    <div></div>
  );
}

export default connect(null, { confirmEmail })(ConfirmEmail);