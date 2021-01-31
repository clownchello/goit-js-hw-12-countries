import axios from 'axios'
import pnotify from './pnotify'

const BASE_URL = 'https://restcountries.eu/rest/v2/name/'

axios.defaults.baseURL = BASE_URL

const formatedData = (items) => {
    if (items.length <= 10) return items
    pnotify.tooManyCountries()
    return[]
}

const fetchCountries = async (countryName) => {
    try {
        const { data } = await axios.get(`/${countryName}`)
        const result = formatedData(data)
        return result
        } catch (error) {
            pnotify.error(error.response.status)
            return []
        }
}

export default { fetchCountries }