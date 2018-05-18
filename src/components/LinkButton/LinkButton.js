import React from 'react'
import './LinkButton.css'

const linkbutton = (props) => {
    return (<a className="LinkButton" rel="noopener noreferrer" onClick={props.click}
        href={props.url} target={props.target}>{props.text}</a>)
}

export default linkbutton
