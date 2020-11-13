import { updateUser } from "./actions/actions"

const INITIAL_STATE = {
    fam_id: '',
    ailments: []
    ,
    isLoggedIn: false,
    isLoading: false,
    apiError: null,
    currentUser: {
        role: ''
    },
    unAuthorizedUsers: [],
    users: [],
    dashboardData: {
        total_guests: 0,
        total_clocked_in: 0,
        total_staying_the_night: 0,
        staff: []
    }
}

export const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DECLINE_USER':

            const updatedUsers = [...state.unAuthorizedUsers]

            updatedUsers.map((user, idx) => {
                if (user.user_id === action.payload.id) {
                    updatedUsers.splice(idx, 1)
                }
            })

            return {
                ...state,
                unAuthorizedUsers: updatedUsers,
                isLoading: false
            }
        case 'ACCEPT_USER':
            console.log('from reducer!')

            const updatedUsersAccept = [...state.unAuthorizedUsers]

            updatedUsersAccept.map((user, idx) => {
                if (user.user_id === action.payload.id) {
                    updatedUsersAccept.splice(idx, 1)
                }
            })

            return {
                ...state,
                unAuthorizedUsers: updatedUsersAccept,
                isLoading: false
            }
        case "SET_UNAUTHORIZED_USERS":
            return {
                ...state,
                unAuthorizedUsers: action.payload,
                isLoading: false
            }
        case 'REGISTER':
            return {
                ...state,
                isLoggedIn: true,
                apiError: null,
                isLoading: false
            }
            break
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
                isLoading: false,
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
                apiError: null,
                isLoading: false,

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
            return {
                ...state,
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
        case 'REGISTER_USER_AS_GUEST':
            return {
                ...state,
                fam_id: action.payload,
                isLoading: false,
                apiError: null
            }
        case 'SET_DASHBOARD_DATA':
            return {
                ...state,
                dashboardData: {
                    total_guests: action.payload.total_guests,
                    total_clocked_in: action.payload.total_clocked_in,
                    total_staying_the_night: action.payload.total_staying_the_night,
                    staff: action.payload.staff
                }
            }
        default:
            return state
    }
}