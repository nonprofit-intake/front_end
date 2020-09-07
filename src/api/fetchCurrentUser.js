
import { axiosWithAuth } from '../utils/auth/axiosWithAuth'

export const fetchCurrentUser = () => {
    return axiosWithAuth().get('/api/users/me').then(res => res.data)
}