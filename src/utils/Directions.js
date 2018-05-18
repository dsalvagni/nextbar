import axios from "axios";
import Settings from "../settings/Settings";

class Directions {

    getDistanceAndDuration(origin, destination, mode = "walking") {
        if (this.promise) {
            return this.promise
        }

        this.promise = new Promise((resolve, reject) => {
            axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json',
                {
                    params: {
                        key: Settings.GOOGLE_API_KEY,
                        origin,
                        destination,
                        mode
                    }
                })
                .then(response => {
                    if(response.status !== 200) reject()
                    const routes = response.data && response.data.routes
                    const route = routes && routes[0]

                    if(!route) reject()

                    const details = route.legs[0]

                    resolve({
                        copyright: route.copyrights,
                        warnings: route.warnings.join('<br />'),
                        distance: details.distance,
                        duration: details.duration
                    })
                })
                .catch(() => reject())
        })

        return this.promise
    }

}

export default Directions