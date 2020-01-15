import axios from "axios"
import setAuthToken from '../../utils/setAuthToken'

export const registerUser = user => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  }
  try {
    dispatch({ type: "START_LOADING" })
    delete user.password2
    await axios.post('/api/users', user, config)
    dispatch({ type: "SUCCESS_REGISTER" })
  } catch (error) {
    console.log(error.response.data);;
    dispatch({ type: "ERROR_REGISTER", payload: error.response.data })
  }
}

export const loginUser = user => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  }
  try {
    dispatch({ type: "START_LOADING" })
    const res = await axios.post('/api/auth', user, config)
    dispatch({ type: "SUCCESS_LOGIN", payload: res.data })
  } catch (error) {
    console.log(error.response.data);
    if (error.response.data === "You have to confirm your email!") {
      dispatch({ type: "SET_RESENDEMAIL", payload: user.email })
    }
    dispatch({ type: "ERROR_LOGIN", payload: error.response.data })

  }
}

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    dispatch({ type: "START_LOADING" })
    const res = await axios.get('/api/auth')
    dispatch({ type: "SUCCESS_LOADUSER", payload: res.data })
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: "ERROR_LOADUSER", payload: error.response.data })
  }
}

export const logout = () => {
  setAuthToken()
  return {
    type: "LOGOUT"
  }
}

export const confirmEmail = token => async dispatch => {
  try {
    dispatch({ type: "START_LOADING" })
    await axios.get(`/api/email/confirm/${token}`)
    dispatch({ type: "SUCCESS_CONFIRMEMAIL" })
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: "ERROR_CONFIRMEMAIL", payload: error.response.data })
  }
}

export const resetPasswordLink = email => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  }
  try {
    dispatch({ type: "START_LOADING" })
    await axios.post('/api/password/reset', { email }, config)
    dispatch({ type: "SUCCESS_RESETPASSWORDLINK" })
  } catch (error) {
    let errorData;
    if (error.response.data.errors) errorData = error.response.data.errors[0].msg
    else errorData = error.response.data
    dispatch({ type: "ERROR_RESETPASSWORDLINK", payload: errorData })
  }
}

export const checkToken = token => async dispatch => {
  try {
    dispatch({ type: "START_LOADING" })
    await axios.get(`/api/password/check/${token}`)
    dispatch({ type: "SUCCESS_CHECKTOKEN" })
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: "ERROR_CHECKTOKEN", payload: error.response.data })
  }
}

export const resetPassword = (password, token) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  }
  try {
    dispatch({ type: "START_LOADING" })
    await axios.put('/api/password/reset', { password, token }, config)
    dispatch({ type: "SUCCESS_RESETPASSWORD" })
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: "ERROR_RESETPASSWORD", payload: error.response.data })
  }
}

export const clearRedirect = () => {
  return {
    type: "CLEAR_REDIRECT"
  }
}

export const resendEmail = email => async dispatch => {
  try {
    dispatch({ type: "START_LOADING" })
    await axios.get(`/api/email/resend/${email}`)
    dispatch({ type: "SUCCESS_RESEND" })
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: "ERROR_RESENDEMAIL", payload: error.response.data })
  }
}

export const clearInfos = () => {
  return {
    type: "CLEAR_INFOS"
  }
}

export const endLoading = () => {
  return {
    type: "END_LOADING"
  }
}

