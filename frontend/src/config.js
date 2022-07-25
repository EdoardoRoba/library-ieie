import axios from "axios"

export const axiosInstance = axios.create({
    // baseURL: "https://library-ieie.herokuapp.com/api/"
    baseURL: "http://localhost:8050/api/"
})