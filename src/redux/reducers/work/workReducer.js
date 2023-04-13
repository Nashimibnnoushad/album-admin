export const work = (state = { userRole: "Admin" }, action) => {
    switch (action.type) { 

      // LISTING  
      case "GET_WORK_LIST_REQUEST": {
        return { ...state, isworklistLoading: true }
      }
      case "GET_WORK_LIST_SUCCESS": {
        return {...state , values: action.payload, workList:action.payload, isworklistLoading : false }
      }
      case "GET_WORK_LIST_ERROR" : {
        return {...state, isworklistLoading : false, workListError :action.payload }
      }

      // ADD
      case "ADD_WORK_REQUEST": {
        return { ...state, isworkaddLoading: true }
      }
      case "ADD_WORK_SUCCESS": {
        return {...state , values: action.payload, workAdd:action.payload, isworkaddLoading : false }
      }
      case "ADD_WORK_ERROR" : {
        return {...state, isworkaddLoading : false, workAddError :action.payload }
      }

      // UPDATE
      case "UPDATE_WORK_REQUEST": {
        return { ...state, isworkupdateLoading: true }
      }
      case "UPDATE_WORK_SUCCESS": {
        return {...state , values: action.payload, workUpdate:action.payload, isworkupdateLoading : false }
      }
      case "UPDATE_WORK_ERROR" : {
        return {...state, isworkupdateLoading : false, workUpdateError :action.payload }
      }

      // DELETE
      case "DELETE_WORK_REQUEST": {
        return { ...state, isworkdeleteLoading: true }
      }
      case "DELETE_WORK_SUCCESS": {
        return {...state , values: action.payload, workDelete:action.payload, isworkdeleteLoading : false }
      }
      case "DELETE_WORK_ERROR" : {
        return {...state, isworkdeleteLoading : false, workDeleteError :action.payload }
      }

      default: {
        return state
      }
    }
  }
  