import React from "react";
import styles from './styles.module.scss'
import {getDescription, getIconUrl} from "../../utils/utils";
import FadeInDiv from "../common/FadeInDiv";

interface IProps {
    data: {
        iconType: string,
        temperature: number,
        cityName: string,
        countryName: string,
        windSpeed: number,
        description: string,
        feelsLike: number
    },
    isFetching?: boolean | undefined,
}


const PrimaryInfo = ({data, isFetching}: IProps) => {

    return <FadeInDiv className={styles.wrapper} isFetching={isFetching}>
        <div className={styles.header}>
            {data.cityName+', '+data.countryName}
        </div>
        <div className={styles.main}>
            <div className={styles.icon}>
                <img alt={'Weather icon'} src={getIconUrl(data.iconType)}/>
            </div>
            <div className={styles.temperature}>
                {Math.round(data.temperature)+'°C'}
            </div>
        </div>
        <div className={styles.description}>
            {getDescription(data.feelsLike, data.description, data.windSpeed)}
        </div>
    </FadeInDiv>
}

export default PrimaryInfo
