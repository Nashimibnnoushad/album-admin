
import { performRequest } from '../../../services/index';
import { history } from '../../../history';

export const logout = () => {
    localStorage.removeItem("crmuser")
    localStorage.removeItem("crmtoken")
    history.push("/")
}

export const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  var date =  [year, day, month ].join('-');
  return date
}

export const getWorkList = (pageno) => {
    let token = JSON.parse(localStorage.getItem('crmtoken'))
    const headers = {
        "Authorization": `Manager ${token}`
    }
  return dispatch => {
    dispatch({
      type: 'GET_WORK_LIST_REQUEST'
    })
    return performRequest('get', `/work?pageNo=${pageno}&pageSize=10`, headers)
      .then((response) => {
        console.log(response,'res')
        if (response.status === 200) {
          console.log('enter')
          dispatch({
            type: 'GET_WORK_LIST_SUCCESS',
            payload: response.data
          })
        }
        if (response.status === 400) {
          dispatch({
            type: 'GET_WORK_LIST_ERROR',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        console.log(error.response, 'error')
        if(error.message === "Network Error"){
          history.push("/error/500")
        }
        else if(error.response.status === 403){
          logout()
        }
        else{
        dispatch({
          type: 'GET_WORK_LIST_ERROR',
          payload: error
        })
      }
      })
  }
}

export const getDateSearchList = (startDate,endDate) => {
  let token = JSON.parse(localStorage.getItem('crmtoken'))
  const headers = {
      "Authorization": `Manager ${token}`
  }
return dispatch => {
  dispatch({
    type: 'GET_WORK_LIST_REQUEST'
  })
  return performRequest('get', `/work/search?startDate=${startDate}&endDate=${endDate}`, headers)
    .then((response) => {
      console.log(response,'res')
      if (response.status === 200) {
        console.log('enter')
        dispatch({
          type: 'GET_WORK_LIST_SUCCESS',
          payload: response.data
        })
      }
      if (response.status === 400) {
        dispatch({
          type: 'GET_WORK_LIST_ERROR',
          payload: response.data
        })
      }
    })
    .catch((error) => {
      console.log(error.response, 'error')
      if(error.message === "Network Error"){
        history.push("/error/500")
      }
      else if(error.response.status === 403){
        logout()
      }
      else{
      dispatch({
        type: 'GET_WORK_LIST_ERROR',
        payload: error
      })
    }
    })
}
}

export const addWork = (data) => {
  let token = JSON.parse(localStorage.getItem('crmtoken'))
  let postReqObj = {};
  postReqObj.advance = data.advance;
  postReqObj.bankId = data.bankId;
  postReqObj.clientName = data.clientName;
  postReqObj.phone = data.phone;
  postReqObj.event = data.event;
  postReqObj.location = data.location;
  postReqObj.eventType = data.eventType;
  if(Array.isArray(data.engagementDate)){
    postReqObj.engagementDate = data.engagementDate[0];
  }
  else{
    postReqObj.engagementDate = new Date(data.engagementDate);
  }
  if(Array.isArray(data.weddingDate)){
    postReqObj.weddingDate = data.weddingDate[0];
  }
  else{
    postReqObj.weddingDate = new Date(data.weddingDate);
  }
  if(Array.isArray(data.receptionDate)){
    postReqObj.receptionDate = data.receptionDate[0];
  }
  else{
    postReqObj.receptionDate = new Date(data.receptionDate);
  }
  postReqObj.religion = data.religion;
  postReqObj.packageAmount = data.packageAmount;
  postReqObj.albumLeaf = data.albumLeaf;

  const headers = {
      "Authorization": `Manager ${token}`
  }
return dispatch => {
  dispatch({
    type: 'ADD_WORK_REQUEST'
  })
  return performRequest('post', '/work', headers, postReqObj)
    .then((response) => {
      console.log(response,'ADD res')
      if (response.status === 200) {
        dispatch({
          type: 'ADD_WORK_SUCCESS',
          payload: response.data
        })
        // getStaffList(1)
      }
      if (response.status === 400) {
        dispatch({
          type: 'ADD_WORK_ERROR',
          payload: response.data
        })
      }
    })
    .catch((error) => {
      console.log(error,'error')
      if(error.message === "Network Error"){
        history.push("/error/500")
      }
      else if(error.response.status === 403){
        logout()
      }
      else{
      dispatch({
        type: 'ADD_WORK_ERROR',
        payload: error.response.data
      })
    }
    })
}
}

export const updateWork = (data,workid) => {
  console.log(data, 'update data')
  let token = JSON.parse(localStorage.getItem('crmtoken'))
  let postReqObj = {};
  postReqObj.advance = data.advance;
  postReqObj.bankId = data.bankId;
  postReqObj.clientName = data.clientName;
  postReqObj.phone = data.phone;
  postReqObj.event = data.event;
  postReqObj.location = data.location;
  postReqObj.eventType = data.eventType;
  if(Array.isArray(data.engagementDate)){
    postReqObj.engagementDate = data.engagementDate[0];
  }
  else{
    postReqObj.engagementDate = data.engagementDate;
  }
  if(Array.isArray(data.weddingDate)){
    postReqObj.weddingDate = data.weddingDate[0];
  }
  else{
    postReqObj.weddingDate = data.weddingDate;
  }
  if(Array.isArray(data.receptionDate)){
    postReqObj.receptionDate = data.receptionDate[0];
  }
  else{
    postReqObj.receptionDate = data.receptionDate;
  }
  postReqObj.religion = data.religion;
  postReqObj.packageAmount = data.packageAmount;
  postReqObj.albumLeaf = data.albumLeaf;

  const headers = {
      "Authorization": `Manager ${token}`
  }
return dispatch => {
  dispatch({
    type: 'UPDATE_WORK_REQUEST'
  })
  return performRequest('put', `/work/${workid}`, headers, postReqObj)
    .then((response) => {
      console.log(response,'update res')
      if (response.status === 200) {
        dispatch({
          type: 'UPDATE_WORK_SUCCESS',
          payload: response
        })
        // getStaffList(1)
      }
      if (response.status === 400) {
        dispatch({
          type: 'UPDATE_WORK_ERROR',
          payload: response.data
        })
      }
    })
    .catch((error) => {
      console.log(error,'error')
      if(error.message === "Network Error"){
        history.push("/error/500")
      }
      else if(error.response.status === 403){
        logout()
      }
      else{
      dispatch({
        type: 'UPDATE_WORK_ERROR',
        payload: error.response.data
      })
    }
    })
}
}

export const deleteWork = (workid) => {
  let token = JSON.parse(localStorage.getItem('crmtoken'))
  let postReqObj = {};

  const headers = {
      "Authorization": `Manager ${token}`
  }
return dispatch => {
  dispatch({
    type: 'DELETE_WORK_REQUEST'
  })
  return performRequest('post', `/work/delete/${workid}`, headers, postReqObj)
    .then((response) => {
      console.log(response,'delete res')
      if (response.status === 200) {
        dispatch({
          type: 'DELETE_WORK_SUCCESS',
          payload: response
        })
        // getStaffList(1)
      }
      if (response.status === 400) {
        dispatch({
          type: 'DELETE_WORK_ERROR',
          payload: response.data
        })
      }
    })
    .catch((error) => {
      console.log(error,'error')
      if(error.message === "Network Error"){
        history.push("/error/500")
      }
      else if(error.response.status === 403){
        logout()
      }
      else{
      dispatch({
        type: 'DELETE_WORK_ERROR',
        payload: error.response.data
      })
    }
    })
}
}


