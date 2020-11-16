import * as actionTypes from "./actionTypes";

const initialState = {
    currentUser: null,
    loading:true
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case actionTypes.PAGE_LOADING:
            return {
                ...state,
                loading:true
            }
        case actionTypes.PAGE_LOADED:
            return {
                ...state,
                loading:false
            }
        default: return state
    }
}

export default reducer;