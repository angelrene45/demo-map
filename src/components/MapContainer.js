import React, {Component, Fragment} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Points from "./Points";
import ModalPoint from "./ModalPoint";

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        visibilitySideBar : 'hidden'  ,
        stores: [{latitude: 47.49855629475769, longitude: -122.14184416996333},
            {latitude: 47.359423, longitude: -122.021071}]
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

    addMarket = (t, map, coord) =>{
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        const newMarker = {
            latitude:lat,
            longitude:lng
        }

        const {stores} = this.state;

        this.setState({
            stores : [...stores,newMarker]
        })

    }

    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
            return <Marker key={index} id={index} name={'test'+index} position={{
                lat: store.latitude,
                lng: store.longitude
            }}
           onClick={this.onMarkerClick} />
        })
    }


    render() {

        const {showingInfoWindow,activeMarker,selectedPlace} = this.state;
        const {google} = this.props;


        return (
           <Fragment>

               <Map
                   google={google}
                   zoom={11}
                   style={mapStyles}
                   initialCenter={{ lat: 47.444, lng: -122.176}}
                   mapTypeControl = {false}
                   fullscreenControl = {false}
                   onClick={this.addMarket}
               >

                   {this.displayMarkers()}

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

               <ModalPoint/>
           </Fragment>
        );
    }

}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyDMaqUH_aztx7Veu40W8u_BNRQ6GL26vEA'
})(MapContainer);
