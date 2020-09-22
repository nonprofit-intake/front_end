const INITIAL_STATE = {
    ailments: []
    ,
    isLoggedIn: false,
    isLoading: false,
    apiError: null,
    currentUser: {
        role: ''
    },
    users: [],
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
                apiError: null,
                isLoading: false
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
                currentUser: action.payload,
                isLoading: false,
                apiError: null

            }
        case 'ERROR':
            return {
                ...state,
                apiError: action.payload,
                isLoading: false
            }
        case 'CLEAR_ERRORS':
            return {
                ...state,
                apiError: null
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload,
                isLoading: false,
                apiError: null

            }
        case "DELETE_USER":
            const users = [...state.users]
            users.forEach((user, idx) => {
                if (user.id == action.payload.id) {
                    users.splice(idx, 1)
                }
            })
        case "REGISTER_USER":
            return state
            return {
                ...state,
                users,
                isLoading: false,
                apiError: null
            }
        case "IS_LOADING":
            return {
                ...state,
                isLoading: true
            }
        case "IS_NOT_LOADING":
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}