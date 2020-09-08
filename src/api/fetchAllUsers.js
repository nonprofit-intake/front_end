import { axiosWithAuth } from '../utils/auth/axiosWithAuth'

export const fetchAllUsers = () => {
    return axiosWithAuth().get('/api/users').then(res => res.data)
}