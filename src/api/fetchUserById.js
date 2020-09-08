import { axiosWithAuth } from '../utils/auth/axiosWithAuth'

export const fetchUserById = (id) => {
    return axiosWithAuth().get(`/api/users/${id}`).then(res => res.data)
}