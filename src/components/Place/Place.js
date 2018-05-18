import React, { Fragment } from 'react'
import './Place.css'

import LinkButton from '../LinkButton/LinkButton'

const place = (props) => {
    const Header = (props) => {
        props = props || {}

        let photo = props.image_url
        let style = { backgroundImage: `url(${photo})` }
        let categories = props.categories && props.categories.map((c) => c.title).join(', ')
        let phone = (
            <span className="Place__Header__Phone">
                <span role="img" aria-label="telephone emoji">☎️</span> <a href="tel:{props.phone}">{props.display_phone}</a>
            </span>
        )
        if(photo && !props.display_phone) { phone = ''}
        return (
            <div className="Place__Header" style={style}>
                <h1>{props.name}</h1>
                <h2>{categories}</h2>
                {phone}
            </div>
        )
    }

    const Price = (props) => {
        let price = props.value && props.value.split('').map((p, k) => <span key={k} role="img" aria-label="flying money emoji">💸</span>)
        return (
            <div className="Place__Details__Detail Place__Details__Detail--Price">
                <h3>Price</h3>
                <p>{price}</p>
            </div>
        )
    }

    const Rating = (props) => {

        const emoji = (rating) => {
            if (!rating) return null

            let emoji_map = {
                "bad1": <span role="img" aria-label="worried face emoji">😟</span>,
                "bad2": <span role="img" aria-label="face with rolling eyes emoji">🙄</span>,
                "neutral": <span role="img" aria-label="neutral face emoji">😐</span>,
                "good1": <span role="img" aria-label="smile face with smilying eyes emoji">😊</span>,
                "good2": <span role="img" aria-label="smile face with heart-eyes emoji">😍</span>,
                "super": <span role="img" aria-label="star struck emoji">🤩</span>
            }

            if (rating < 2) return emoji_map['bad1']
            if (rating >= 2 && rating < 3) return emoji_map['bad2']
            if (rating === 3) return emoji_map['neutral']
            if (rating >= 3 && rating < 4) return emoji_map['good1']
            if (rating >= 4 && rating < 4.6) return emoji_map['good2']
            if (rating >= 4.5) return emoji_map['super']
        }

        return (
            <div className="Place__Details__Detail Place__Details__Detail--Rating">
                <h3>Rating</h3>
                <p>{props && props.value} {emoji(props.value)}</p>
            </div>
        )
    }

    const Directions = (props) => {
        let isLoading = props.isLoading
        let classes = ['Place__Directions__Walking']
        let location = props && props.location ? props.location : { display_address: [] }
        let position = props && props.position ? props.position : {  }
        
        if(isLoading) classes.push('isLoading')

        props = !isLoading ? props : {
            location,
            position,
            coordinates: {},
            directions: {
                duration: {
                    text: ''
                },
                distance: {
                    text: ''
                },
                warnings: '',
                copyright: ''
            },
        }


        let directions_info = props.directions.duration.text ? `${props.directions.duration.text} (${props.directions.distance.text})` : null
        let maps_url = `https://www.google.com/maps/dir/?api=1&origin=${props.position.latitude},${props.position.longitude}&destination=${props.coordinates.latitude},${props.coordinates.longitude}&travelmode=walking`;
        let directions = (
            <Fragment>
                <div className={classes.join(' ')}>
                    <div className="Place__Directions__Walking__Info">
                        <span role="img" aria-label="person walking emoji">🚶</span><p>{directions_info}</p>
                    </div>
                    <div className="Place__Directions__Walking__Action">
                        <LinkButton url={maps_url} text="Go" target="_blank" />
                    </div>
                </div>
                <div className="Place__Directions__Copyright">
                    <small>{props.directions.warnings}</small> <small>{props.directions.copyright}</small>
                </div>
            </Fragment>
        )

        return (
            <div className="Place__Directions">
                <h3>Address</h3>
                <address>{props && props.location && props.location.display_address.join(', ')}</address>
                {directions}
            </div>
        )
    }

    let isLoading = !props || !props.name
    let isLoadingDirections = !props || !props.directions
    let classes = ['Place']

    if (isLoading) classes.push('isLoading')

    return (
        <div className={classes.join(' ')}>
            <Header {...props} />
            <div className="Place__Details">
                <Price value={props.price} />
                <Rating value={props.rating} />
            </div>
            <Directions {...props} isLoading={isLoadingDirections}/>
        </div>
    )
}

export default place
