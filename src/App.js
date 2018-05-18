import React, { Component, Fragment } from 'react';
import './App.css';

import Location from './utils/Location'
import CitySelection from './components/CitySelection/CitySelection'
import Overlay from './components/Overlay/Overlay'
import Places from './containers/Places/Places'


class App extends Component {

  constructor() {
    super()
    this.state = {
      background: null,
      position: {}
    }
  }

  componentDidMount() {
    this.askCurrentPosition()
  }

  askCurrentPosition() {
    let state = {...this.state}
    let currentLocation = new Location()
    currentLocation.getCurrentPosition()
      .then((response) => state.position = response)
      .then(() => {
        state.show_overlay = false;
        this.setState(state)
      })
      .catch(() => {
        state.show_overlay = true;
        this.setState(state)
      });
  }

  getMapBackgroundImage() {
    if(this.state.position && this.state.position.latitude) {
      let latitude = this.state.position.latitude
      let longitude = this.state.position.longitude
      return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&size=1600x150&zoom=12&scale=4`
    }
  }

  render() {

    let styles
    let overlay
    let background_image = this.getMapBackgroundImage();

    if(background_image)
      styles = {
        backgroundImage: `url(${background_image})`
      }

    if(this.state.show_overlay)
      overlay = <Overlay clicked={this.askCurrentPosition.bind(this)}/>

    return (
      <Fragment>
        <div className="App">
          <header className="App__header" style={ styles }>
            <CitySelection position={this.state.position} />
          </header>
          <section>
            <Places position={this.state.position} />
          </section>
          <footer>
            <p>This app is using <a rel="noopener noreferrer" target="_blank" href="https://www.yelp.com/developers">YELP Api</a> to get all places information.</p>
            <p>This is a pet project from <a href="http://twitter.com/danielsalvagni">@danielsalvagni</a> to play a bit with React and Google and YELP APIs.</p>
          </footer>
        </div>
        {overlay}
      </Fragment>
    );
  }
}

export default App;
