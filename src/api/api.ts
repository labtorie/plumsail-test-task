import axios from 'axios'
import {apiKey} from "../config/config";

const axiosInstance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
})

export const getWeather = async (cityName: string) => {
    return await axiosInstance.get(`weather?q=${cityName}&appid=${apiKey}&units=metric`).then(resp=>resp.data)
}
