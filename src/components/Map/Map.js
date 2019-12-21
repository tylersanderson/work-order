import React from 'react';
import './Map.css';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);
 
class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 40.8136,
      lng: -96.7026
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div> 
       <article>
         <main>
            <div 
              style={{ height: '80vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
              >
                <AnyReactComponent
                  lat={40.8136}
                  lng={-96.7026}
                  text="My Marker"
                />
              </GoogleMapReact>
            </div>
          </main>
        </article> 
        <div className='map-close' onClick={this.props.toggleMap}>&times;</div>
      </div>
    );
  }
}
 
export default Map;