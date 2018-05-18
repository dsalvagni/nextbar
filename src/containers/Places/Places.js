import React, { Component } from 'react'
import Place from '../../components/Place/Place'
import LinkButton from '../../components/LinkButton/LinkButton'
import './Places.css'

import Directions from '../../utils/Directions'
import NearbyPlaces from '../../utils/NearbyPlaces'
import PullToRefresh from '../../utils/PullToRefresh'

class Places extends Component {

    constructor() {
        super()
        this.loaded = false
        this.all_places = []
        this.already_viewed = []
        this.state = {
            selected: null
        }
            
        this.ptr = PullToRefresh.init({
            mainElement: 'body',
            onRefresh: (done) => { 
                if(!this.loaded) return done() 
                this.selectRandonPlace()
                done()
            }
        });
    }

    componentDidUpdate() {
        if(!this.loaded)
            this.loadNearbyPlaces()
    }

    loadNearbyPlaces() {
        let nearby = new NearbyPlaces(this.props.position);
        nearby.getNearbyPlaces()
            .then((results) => {
                this.all_places = results
                this.loaded = true
                this.selectRandonPlace()
            })
            .catch(() => {
                //failed
            })
    }

    validateList() {
        if(!this.all_places.length && this.already_viewed.length) {
            this.all_places = [...this.already_viewed]
            this.already_viewed = []
        }
    }

    selectRandonPlace() {
        this.validateList()
        const state = { ...this.state }
        const random = Math.floor(Math.random() * this.all_places.length)
        
        let selected = {...this.all_places[random]}
        this.already_viewed.push(selected)
        state.selected = selected
    
        this.all_places.splice(random, 1)

        this.setState(state)
        this.getDistanceAndDuration()
    }

    getDistanceAndDuration() {

        const position = this.props.position
        const selected = {...this.state.selected}
        const location = selected.coordinates
        const origin = `${position.latitude},${position.longitude}`
        const destination = `${location.latitude},${location.longitude}`

        const directions = new Directions()
        directions.getDistanceAndDuration(origin, destination)
            .then((data) => {
                const state = { ...this.state }
                state.selected.directions = data
                this.setState(state)
            })
            .catch(() => console.log('failed'))
        
    }


    render() {
        let main_button
        if(this.props.position && this.props.position.latitude)
            main_button = <LinkButton text="Take me somewhere else" click={this.selectRandonPlace.bind(this)} />

        return (
            <div className="Places">
                <Place {...this.state.selected} position={this.props.position} />
                <div className="Places__Footer">
                    {main_button}
                </div>
            </div>
        );
    }
}

export default Places;
