import axios from "axios";
import Settings from "../settings/Settings";

class NearbyPlaces {

    constructor(position = {}) {
        this.position = {
            ...position
        }
    }

    getNearbyPlaces(radius = 1200, opennow = true, categories = "bars", limit = 50) {
        if (this.nearby_promise) {
            return this.nearby_promise
        }
        this.nearby_promise = new Promise((resolve, reject) => {
            axios.get('https://jsonp.afeld.me/?callback=?&url=https://api.yelp.com/v3/businesses/search',
                {
                    headers: {
                        'Authorization': "Bearer " + Settings.YELP_API_KEY
                    },
                    params: {
                        latitude: this.position.latitude,
                        longitude: this.position.longitude,
                        radius,
                        opennow,
                        limit,
                        categories
                    },
                    withCredentials: false
                })
                .then(response => resolve(response.data && response.data.businesses))
                .catch(() => reject())
        })

        return this.nearby_promise
    }

}

export default NearbyPlaces
