const INITIAL_STATE = {
    ailments: []
    ,
    isLoggedIn: false,
    isLoading: false,
    apiError: null,
    currentUser: {}
}

export const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'REGISTER':
            return {
                ...state,
                isLoggedIn: true,
                apiError: null

            }
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                apiError: null
            }
        case 'LOG_OUT':
            return {
                ...state,
                isLoggedIn: false,
                apiError: null,
                currentUser: {}
            }
        case `SET_CURRENT_USER`:
            return {
                ...state,
                currentUser: action.payload
            }
        case 'ERROR':
            return {
                ...state,
                apiError: action.payload
            }
        case 'CLEAR_ERRORS':
            return {
                ...state,
                apiError: null
            }
        default:
            return state
    }
}