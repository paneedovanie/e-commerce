import axios from 'axios'

const URL = 'https://api.openweathermap.org/data/2.5/forecast'
const API_KEY = '1ca403a4d70e588f60efd5b0ef1347b2'

export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY
        }
    })

    return data
}

export const fetchOwnerWeather = async (latlon) => {
    const { data } = await axios.get(URL, {
        params: {
            lat: latlon.lat,
            lon: latlon.lng,
            units: 'metric',
            APPID: API_KEY
        }
    })

    return data
}