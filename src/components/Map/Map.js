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
  
  constructor(props) {
   super(props);
   this.state = {
    center: {
        lat: JSON.parse(this.props.orderlat),
        lng: JSON.parse(this.props.orderlong)
       },
    zoom: 16
    }
  }
  



  render() {
    const { ordernumber, orderlat, orderlong } = this.props;
    return (
      // Important! Always set the container height explicitly
      <div> 
       <article>
         <main>
            <div 
              style={{ height: '80vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
              >
                <AnyReactComponent
                  lat={ orderlat }
                  lng={ orderlong }
                  text={ordernumber}
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