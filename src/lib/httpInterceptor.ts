import axios from "axios";

const httpInterceptor = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true
})

export default httpInterceptor