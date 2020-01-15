const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null,
  error: null,
  alert: null,
  loading: false,
  emailToResend: null,
  redirect: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "SUCCESS_LOGIN":
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        token: action.payload.token,
      }
    case "SUCCESS_LOADUSER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      }
    case "SUCCESS_CONFIRMEMAIL":
      return {
        ...state,
        alert: "Success, email is confirm",
        loading: false,
      }
    case "SUCCESS_REGISTER":
      return {
        ...state,
        alert: "Success registered, now confirm your email",
        loading: false
      }
    case "SUCCESS_RESETPASSWORDLINK":
      return {
        ...state,
        alert: "Success, link sended",
        error: null,
        loading: false,
      }
    case "SUCCESS_RESETPASSWORD":
      return {
        ...state,
        alert: "Success, now log in!",
        loading: false,
        redirect: true
      }
    case "SUCCESS_RESEND":
      return {
        ...state,
        alert: "Success, email resended",
        emailToResend: null,
        loading: false
      }
    case "SUCCESS_CHECKTOKEN":
      return {
        ...state,
        loading: false,
      }
    case "ERROR_LOADUSER":
    case "LOGOUT":
      localStorage.removeItem('token')
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        loading: false,
      }
    case "ERROR_LOGIN":
    case "ERROR_REGISTER":
      if (action.payload.errors) {
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          alert: null,
          error: [...action.payload.errors.map(error => error.msg)],
          loading: false,
        }
      }
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        alert: null,
        error: action.payload,
        loading: false,
      }
    case "ERROR_CHECKTOKEN":
      return {
        ...state,
        redirect: true,
        loading: false,
        error: action.payload,
      }
    case "ERROR_RESENDEMAIL":
      return {
        ...state,
        error: action.payload,
        emailToResend: null,
        loading: false
      }
    case "ERROR_RESETPASSWORD":
      return {
        ...state,
        loading: false,
        error: action.payload,
        redirect: true,
      }
    case "ERROR_CONFIRMEMAIL":
    case "ERROR_RESETPASSWORDLINK":
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case "START_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
        alert: null
      }
    case "CLEAR_REDIRECT":
      return {
        ...state,
        redirect: false
      }
    case "CLEAR_INFOS":
      return {
        ...state,
        error: null,
        alerts: null,
      }
    case "SET_RESENDEMAIL":
      return {
        ...state,
        emailToResend: action.payload
      }
    default:
      return state
  }
}