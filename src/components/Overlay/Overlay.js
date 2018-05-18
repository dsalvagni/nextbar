import React from 'react'
import './Overlay.css'

const overlay = (props) => {
    return (
        <div className="Overlay">
            <div className="Overlay__Wrapper">
                <span role="img" aria-label="world map emoji">🗺️</span>
                <h1>Oh, I couldn't get your location</h1>
                <h2>Would you mind to allow it? I promisse I won't track you.</h2>

            </div>
        </div>
    )
}

export default overlay