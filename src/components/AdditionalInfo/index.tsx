import React, {useMemo} from "react";
import styles from './style.module.scss'
import {calculateDewPoint, degreeToCompassPoint, toKilometers, toOneDecimalString} from "../../utils/utils";
import FadeInDiv from "../common/FadeInDiv";

interface IProps {
    data: {
        windSpeed: number,
        windDegree: number,
        pressure: number,
        humidity: number,
        visibility: number,
        temperature: number,
    },
    isFetching?: boolean | undefined,
}


const AdditionalInfo = ({data, isFetching}: IProps) => {

    const arrowStyle = {transform: `rotate(${data.windDegree-45}deg)`}

    const dewPoint = useMemo(
        () => calculateDewPoint(data.temperature, data.humidity),
        [data.temperature, data.humidity]
    )

    return <FadeInDiv className={styles.wrapper} isFetching={isFetching}>
        <div className={styles.grid}>
            <div className={styles.gridCell}>
                <i className={'fas fa-location-arrow'} style={arrowStyle}/>
                <div>
                    {toOneDecimalString(data.windSpeed)+'m/s '+degreeToCompassPoint(data.windDegree)}
                </div>
            </div>
            <div className={styles.gridCell}>
                <i className={'fas fa-tachometer-alt'}/>
                <div>
                    {data.pressure+'hPa'}
                </div>
            </div>
            <div className={styles.gridCell}>
                {'Humidity: '+data.humidity+'%'}
            </div>
            <div className={styles.gridCell}>
                {'Dew point: '+dewPoint+'°C'}
            </div>
            <div className={styles.gridCell}>
                {'Visibility: '+ toKilometers(data.visibility)+'km'}
            </div>
        </div>
    </FadeInDiv>
}

export default AdditionalInfo
