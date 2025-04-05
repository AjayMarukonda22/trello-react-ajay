// boardListsReducer.js

// Initial state
export const initialState = {
    board: null,
    lists: [],
    cardsPerList: {},
    loading: false,
    error: null
  };
  
  // Action types
  export const actionTypes = {
    FETCH_START: 'FETCH_START',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_FAILURE: 'FETCH_FAILURE',
    ADD_LIST: 'ADD_LIST',
    ARCHIVE_LIST: 'ARCHIVE_LIST',
    ADD_CARD: 'ADD_CARD',
    DELETE_CARD: 'DELETE_CARD',
    RESET_ERROR: 'RESET_ERROR'
  };
  
  // Reducer function
  export const reducer = (state, action) => {
    switch (action.type) {
      case actionTypes.FETCH_START:
        return { ...state, loading: true, error: null };
        
      case actionTypes.FETCH_SUCCESS:
        return { 
          ...state, 
          loading: false,
          board: action.payload.board,
          lists: action.payload.lists,
          cardsPerList: action.payload.cards
        };
        
      case actionTypes.FETCH_FAILURE:
        return { ...state, loading: false, error: action.payload };
        
      case actionTypes.ADD_LIST:
        return {
          ...state,
          lists: [...state.lists, action.payload]
        };
        
      case actionTypes.ARCHIVE_LIST:
        return {
          ...state,
          lists: state.lists.filter(list => list.id !== action.payload)
        };
        
      case actionTypes.ADD_CARD:
        return {
          ...state,
          cardsPerList: {
            ...state.cardsPerList,
            [action.payload.listId]: [
              ...(state.cardsPerList[action.payload.listId] || []),
              action.payload.card
            ]
          }
        };
        
      case actionTypes.DELETE_CARD:
        return {
          ...state,
          cardsPerList: {
            ...state.cardsPerList,
            [action.payload.listId]: 
              state.cardsPerList[action.payload.listId].filter(
                card => card.id !== action.payload.cardId
              )
          }
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
    fetchSuccess: (board, lists, cards) => ({
      type: actionTypes.FETCH_SUCCESS,
      payload: { board, lists, cards }
    }),
    fetchFailure: (error) => ({
      type: actionTypes.FETCH_FAILURE,
      payload: error
    }),
    addList: (list) => ({
      type: actionTypes.ADD_LIST,
      payload: list
    }),
    archiveList: (listId) => ({
      type: actionTypes.ARCHIVE_LIST,
      payload: listId
    }),
    addCard: (listId, card) => ({
      type: actionTypes.ADD_CARD,
      payload: { listId, card }
    }),
    deleteCard: (listId, cardId) => ({
      type: actionTypes.DELETE_CARD,
      payload: { listId, cardId }
    }),
    resetError: () => ({ type: actionTypes.RESET_ERROR })
  };