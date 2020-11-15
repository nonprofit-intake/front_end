import axios from 'axios'


export const axiosWithAuth = () => {
    const token = localStorage.getItem('token')
    console.log(URL)
    return axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
        baseURL: 'https://user-intake-backend.herokuapp.com/'
    });
};