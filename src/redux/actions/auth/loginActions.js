
import { performRequest } from '../../../services/index';
import { history } from '../../../history';


export const loginWithJWT = user => {
  console.log(user)
  let postReqObj = {};
  postReqObj.email = user.email;
  postReqObj.password = user.password;
  const headers = {}
  return dispatch => {
    // dispatch({
    //   type: 'LOGIN_WITH_JWT_CLEAR'
    // })
    dispatch({
      type: 'LOGIN_WITH_JWT_REQUEST'
    })
    return performRequest('post', '/login', headers, postReqObj)
      .then((response) => {
        console.log(response,'res')
        if (response.status === 200) {
          console.log('enter')
          var loggedInUser = { name: "" }
          dispatch({
            type: 'LOGIN_WITH_JWT_SUCCESS',
            payload: { loggedInUser, response, loggedInWith: "jwt" }
          })
        }
        if (response.status === 400) {
          dispatch({
            type: 'LOGIN_WITH_INCORRECT_CREDENTIALS',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        if(error.message === "Network Error"){
          history.push("/error/500")
        }
        else{
          dispatch({
            type: 'LOGIN_WITH_JWT_ERROR',
            payload: error
          })
        }
      })
  }
}

export const changeRole = role => {
  return dispatch => dispatch({ type: "CHANGE_ROLE", userRole: role })
}

