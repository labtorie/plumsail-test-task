import React, {useEffect, useState} from 'react';
import {getWeather} from "./api/api";
import PrimaryInfo from "./components/PrimaryInfo";
import styles from './styles.module.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import AdditionalInfo from "./components/AdditionalInfo";

type Weather = {
    id: number,
    main: string,
    description: string,
    icon: string,
}

type Main = {
    [key: string]: number
}
type Response = {
    weather: Array<Weather>,
    main: Main,
    visibility: number,
    name: string,
    sys: {
        country: string
    },
    wind: any
}

const defaultData: Response = {
    main: {},
    visibility: 0,
    weather: [
        {
            id: 0,
            main: '',
            description: '',
            icon: '',
        }
    ],
    sys: {country: ''},
    name: '',
    wind: {speed: 0, deg: 0}
}

const Widget = ({city = 'санкт петербург'}) => {

    const [data, setData] = useState(defaultData)
    const [isFetching, setFetching] = useState(true)

    async function fetchWeather() {
        setFetching(true)
        const response = await getWeather(city)
        //@ts-ignore
        setData(response)
        setFetching(false)
    }

    useEffect(() => {
        fetchWeather()
    }, [])

    const primaryData = {
        iconType: data.weather[0].icon,
        temperature: data.main.temp,
        cityName: data.name,
        countryName: data.sys.country,
        description: data.weather[0].description,
        windSpeed: data.wind.speed,
        feelsLike: data.main.feels_like,
    }

    const additionalData = {
        windDegree: data.wind.deg,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        visibility: data.visibility,
        temperature: data.main.temp,
    }

    return (
        <div className={styles.widgetContainer}>
            <PrimaryInfo data={primaryData} isFetching={isFetching}/>
            <AdditionalInfo data={additionalData} isFetching={isFetching}/>
        </div>
    );
}

export default Widget;
