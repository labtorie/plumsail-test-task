export function getIconUrl(type: string) :string {
    return `https://openweathermap.org/img/wn/${type}@2x.png`
}


// According to this data https://www.weather.gov/pqr/wind (This data is not provided by API)
const windStages = [
    [0,'Calm'],
    [1,'Light air'],
    [4,'Light breeze'],
    [8,'Gentle breeze'],
    [13, 'Moderate breeze'],
    [19, 'Fresh breeze'],
    [25, 'Strong breeze'],
    [32, 'Near gale'],
    [39, 'Gale'],
    [47, 'Strong gale'],
    [55, 'Whole gale'],
    [64, 'Storm force'],
    [75, 'Hurricane force']
]
function getWindTypeBySpeed(speed: number): string {
    const mph = speed / 1.609
    let finalType: string = ''
    for (const [speedFrom, description] of windStages) {
        finalType = mph >= speedFrom ? ''+description : finalType
    }
    return finalType
}

function capitalize(str: string):string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function getDescription(feelsLike: number, weatherDescription: string, windSpeed: number) {
    return `Feels like ${Math.round(feelsLike)}°C. ${capitalize(weatherDescription)}. ${getWindTypeBySpeed(windSpeed)}.`
}

// Using the formula given here: http://hyperphysics.phy-astr.gsu.edu/hbase/Kinetic/relhum.html
export function calculateDewPoint (t: number, h: number): number {
    const rH = h / 100
    const A = 17.27
    const B = 237.7
    const lnRH = Math.log(rH)
    const commonPart = lnRH + (A*t)/(B+t)
    return Math.round(B * commonPart / (A - commonPart))
}

// According to this data:
// https://en.wikipedia.org/wiki/Points_of_the_compass#/media/File:Brosen_windrose_Full.svg
const compassPoints = [
  'N', 'NNE', 'NE', 'ENE',
  'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW',
  'W', 'WNW', 'NW', 'NNW',
]

const pointRange = 11.25

export function degreeToCompassPoint(deg: number):string {

    const pointsWithRanges = compassPoints.map((name, index)=>{
        const center = index * pointRange * 2
        return {
            name,
            from: center - pointRange,
            to: center + pointRange
        }
    })

    const point = pointsWithRanges.find(point=>(deg > point.from && deg <= point.to))
    return point?.name || 'N'
}

export function toOneDecimalString(num: number): string {
    return (Math.round(num*10) / 10).toFixed(1)
}

export function toKilometers(meters: number): string {
    return toOneDecimalString(meters / 1000)
}
