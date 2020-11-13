import axios from 'axios'


const URL = process.env.REACT_APP_ENV === 'production' 
                        ? process.env.REACT_APP_URL_PROD
                        : process.env.REACT_APP_URL_DEV

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token')
    console.log(URL)
    return axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
        baseURL: URL
    });
};