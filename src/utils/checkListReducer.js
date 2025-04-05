// checklistReducer.js

// Initial state
export const initialState = {
    checkLists: [],
    loading: false,
    error: null
  };
  
  // Action types
  export const actionTypes = {
    FETCH_START: 'FETCH_START',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_FAILURE: 'FETCH_FAILURE',
    ADD_CHECKLIST: 'ADD_CHECKLIST',
    DELETE_CHECKLIST: 'DELETE_CHECKLIST',
    ADD_CHECKITEM: 'ADD_CHECKITEM',
    DELETE_CHECKITEM: 'DELETE_CHECKITEM',
    UPDATE_CHECKITEM: 'UPDATE_CHECKITEM',
    RESET_ERROR: 'RESET_ERROR'
  };
  
  // Reducer function
  export const reducer = (state, action) => {
    switch (action.type) {
      case actionTypes.FETCH_START:
        return { ...state, loading: true, error: null };
        
      case actionTypes.FETCH_SUCCESS:
        return { ...state, loading: false, checkLists: action.payload };
        
      case actionTypes.FETCH_FAILURE:
        return { ...state, loading: false, error: action.payload };
        
      case actionTypes.ADD_CHECKLIST:
        return { ...state, checkLists: [...state.checkLists, action.payload] };
        
      case actionTypes.DELETE_CHECKLIST:
        return {
          ...state,
          checkLists: state.checkLists.filter(cl => cl.id !== action.payload)
        };
        
      case actionTypes.ADD_CHECKITEM:
        return {
          ...state,
          checkLists: state.checkLists.map(cl =>
            cl.id === action.payload.checkListId
              ? {
                  ...cl,
                  checkItems: [...(cl.checkItems || []), action.payload.item]
                }
              : cl
          )
        };
        
      case actionTypes.DELETE_CHECKITEM:
        return {
          ...state,
          checkLists: state.checkLists.map(cl =>
            cl.id === action.payload.checkListId
              ? {
                  ...cl,
                  checkItems: cl.checkItems.filter(
                    item => item.id !== action.payload.checkItemId
                  )
                }
              : cl
          )
        };
        
      case actionTypes.UPDATE_CHECKITEM:
        return {
          ...state,
          checkLists: state.checkLists.map(cl =>
            cl.id === action.payload.checkListId
              ? {
                  ...cl,
                  checkItems: cl.checkItems.map(item =>
                    item.id === action.payload.checkItemId
                      ? { ...item, state: action.payload.state }
                      : item
                  )
                }
              : cl
          )
        };
        
      case actionTypes.RESET_ERROR:
        return { ...state, error: null };
        
      default:
        return state;
    }
  };
  
  // Action creators
  export const actions = {
    fetchStart: () => ({ type: actionTypes.FETCH_START }),
    fetchSuccess: (checkLists) => ({
      type: actionTypes.FETCH_SUCCESS,
      payload: checkLists
    }),
    fetchFailure: (error) => ({
      type: actionTypes.FETCH_FAILURE,
      payload: error
    }),
    addChecklist: (checklist) => ({
      type: actionTypes.ADD_CHECKLIST,
      payload: checklist
    }),
    deleteChecklist: (checklistId) => ({
      type: actionTypes.DELETE_CHECKLIST,
      payload: checklistId
    }),
    addCheckItem: (checkListId, item) => ({
      type: actionTypes.ADD_CHECKITEM,
      payload: { checkListId, item }
    }),
    deleteCheckItem: (checkListId, checkItemId) => ({
      type: actionTypes.DELETE_CHECKITEM,
      payload: { checkListId, checkItemId }
    }),
    updateCheckItem: (checkListId, checkItemId, state) => ({
      type: actionTypes.UPDATE_CHECKITEM,
      payload: { checkListId, checkItemId, state }
    }),
    resetError: () => ({ type: actionTypes.RESET_ERROR })
  };