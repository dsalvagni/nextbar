import React from 'react'
import './CancelButton.css'

const cancelbutton = (props) => {
    return (<a className="CancelButton" rel="noopener noreferrer" onClick={props.click}
        href={props.url} target={props.target}>{props.text}</a>)
}

export default cancelbutton
