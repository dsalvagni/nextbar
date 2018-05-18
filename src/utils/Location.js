import Settings from '../settings/Settings'
import axios from 'axios'

class Location {

    constructor(options = {}) {
        this.options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
            ...options
        }
    }

    getCurrentPosition() {
        var defer = new Promise((resolve, reject) => {

            if (this.position) {
                return resolve(this.position)
            }

            const success = (response) => {
                
                this.position = { 
                    latitude: response.coords.latitude,
                    longitude: response.coords.longitude
                }

                this.getCityNameByLatLong(
                    this.position.latitude, this.position.longitude
                )
                    .then(this._parseGoogleApiResults.bind(this))
                    .then(resolve.bind(this, this.position))
            }

            const error = () => {
                return reject({ message: "The user have denied the Geolocation" })
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success.bind(this), error)
            } else {
                return reject({ message: "This browser doesn't support Geolocation." })

            }
        });

        return defer
    }

    getCityNameByLatLong(lat, long) {
        let API_KEY = Settings.GOOGLE_API_KEY
        let URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`

        return axios.get(URL)
            .catch(() => { })
    }

    _parseGoogleApiResults(response) {
        let keys = ['sublocality_level_2', 'sublocality_level_1', 'locality']
        let result

        let results = response.data.results.filter((item) => {
            let filter = false
            keys.forEach((key) => {
                if (item.types.indexOf(key) >= 0) {
                    filter = true
                    return
                }
            })
            return filter
        })
        result = results.length && { ...results[0] }
        this.position.formatted = result.formatted_address
    }

}

export default Location