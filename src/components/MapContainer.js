import React, {Component, Fragment} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component {

    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {},        //Shows the infoWindow to the selected place upon a marker
        visibilitySideBar : 'hidden'
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

    showSideBar = () => {
        this.setState({
            visibilitySideBar:'visible'
        });
    }

    render() {

        const {visibilitySideBar} = this.state;

        return (
           <Fragment>
               <div className="content">
                   <Map
                       google={this.props.google}
                       zoom={14}
                       style={mapStyles}
                       initialCenter={{lat: -1.2884, lng: 36.8233}}
                   >
                       <Marker
                           onClick={this.onMarkerClick}
                           name={'Kenyatta International Convention Centre'}
                       />

                       <InfoWindow
                           marker={this.state.activeMarker}
                           visible={this.state.showingInfoWindow}
                           onClose={this.onClose}>
                           <div>
                               <h4>{this.state.selectedPlace.name}</h4>
                           </div>
                       </InfoWindow>
                   </Map>
               </div>

               <div className="button-sidebar" onClick={this.showSideBar}>

               </div>



               <div className="sidebar" style={ { visibility: visibilitySideBar} }>
                   <span className="active">Home</span>
                   <span>News</span>
                   <span>Contact</span>
                   <span>About</span>
               </div>


           </Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDMaqUH_aztx7Veu40W8u_BNRQ6GL26vEA'
})(MapContainer);
