import React from 'react'
import './CitySelection.css'


const cityselection = (props) => {
    let output = <span role="img" aria-label="world map emoji">🗺️</span>

    if(props.position && props.position.formatted) {
        output = props.position.formatted
    }

    return (
        <div className="CitySelection">
            {output}
        </div>
    )
}

export default cityselection