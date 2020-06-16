import React, {Component, Fragment} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Points from "./Points";

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component {

    state = {
        showingInfoWindow: false,       //Hides or the shows the infoWindow
        activeMarker: {},               //Shows the active marker upon click
        selectedPlace: {},              //Shows the infoWindow to the selected place upon a marker
        visibilitySideBar : 'hidden'    //Show or hide sideBar from list points
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };


    render() {

        const {showingInfoWindow,activeMarker,selectedPlace} = this.state;
        const {google} = this.props;

        return (
           <Fragment>

               <Map
                   google={google}
                   zoom={14}
                   style={mapStyles}
                   initialCenter={{lat: -1.2884, lng: 36.8233}}
                   mapTypeControl = {false}
                   fullscreenControl = {false}
               >
                   <Marker
                       onClick={this.onMarkerClick}
                       name={'Kenyatta International Convention Centre'}
                   />

                   <InfoWindow
                       marker={activeMarker}
                       visible={showingInfoWindow}
                       onClose={this.onClose}>
                       <div>
                           <h4>{selectedPlace.name}</h4>
                       </div>
                   </InfoWindow>
               </Map>


               <Points/>

           </Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDMaqUH_aztx7Veu40W8u_BNRQ6GL26vEA'
})(MapContainer);
