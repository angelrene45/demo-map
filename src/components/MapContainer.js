import React, {Component, Fragment} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Points from "./Points";
import ModalPoint from "./ModalPoint";
import { connect } from 'react-redux';
import { createPoint } from '../store/actions/pointsActions'
import { firestoreConnect } from "react-redux-firebase";
import {compose} from 'redux';

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component {

    state = {};
    modalRef    = React.createRef(); // Referencia al componente hijo para manejar sus eventos <ModalPoint>
    markerObjects = {};

    constructor(props) {
        super(props);

        // Datos desde el Reducer points
        const {stores} = props;

        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            currentClickPosition:{},
            visibilitySideBar : 'hidden'  ,
            stores: stores,
            centerInMap:{
                lat:47.444,
                lng: -122.176
            },
            defaultZoom:11
        }
    }

    /* Click en cualquier parte del mapa */
    handleClickMap = (t, map, coord) =>{
        const { latLng } = coord;

        // Obtenemos latitud y longitud
        const lat = latLng.lat();
        const lng = latLng.lng();

        const newMarker = {
            latitude:lat,
            longitude:lng
        }

        // Activamos evento del componente hijo <ModalPoint>
        this.modalRef.current.showModal();

        // guadramos la posicion donde el usuario hizo click en el mapa
        this.setState({
            currentClickPosition:newMarker
        });


    }

    /* Evento que manda a llamar el componente hijo <ModalPoint> */
    addMark = (namePoint) => {

        const {currentClickPosition} = this.state;

        const currentDate = Date.now();

        const newMarket  = {id:currentDate,name:namePoint,date:currentDate,...currentClickPosition};

        // Creamos el nuevo punto con redux (pointsReducers.js)
        const {createPoint} = this.props;
        createPoint(newMarket)

        // Activamos evento del componente hijo <ModalPoint>
        this.modalRef.current.hideModal();

        // Crerramos el infoView
        this.onClose(null);

    }

    /* Click en el marcador */
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    /* Evento del InfoView */
    onClose = props => {
        const {showingInfoWindow} = this.state;
        if (showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    onMarkerMounted = index => element => {
        this.markerObjects = {
            ...this.markerObjects,
            [index]: {...element}
        };
    };

    /* Muestra los marcadores en el mapa */
    displayMarkers = () => {
        const {stores} = this.props;

        return stores.map((store, index) => {
            return <Marker key={index} id={store.id} name={store.name} ref={this.onMarkerMounted(store.id)}
               position={{
                    lat: store.latitude,
                    lng: store.longitude
               }}
           onClick={this.onMarkerClick} />
        })
    }

    /* Evento que dispara el componente <Points> */
    handleClickPoint = (store) => () => {
        const {latitude,longitude} = store;

        const newCenter       = {
            lat:latitude,
            lng:longitude
        }

        // Hacemos zoom al punto clickeado
        this.setState({
            centerInMap:newCenter,
            defaultZoom:15
        })

        // Mostramos su info view
        const {marker,props} = this.markerObjects[store.id];

        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    }


    render() {

        const {showingInfoWindow,activeMarker,selectedPlace,defaultZoom,centerInMap} = this.state;
        const {google} = this.props;


        return (
           <Fragment>

               <Map
                   google={google}
                   zoom={defaultZoom}
                   style={mapStyles}
                   initialCenter={centerInMap}
                   center={centerInMap}
                   mapTypeControl = {false}
                   fullscreenControl = {false}
                   onClick={this.handleClickMap}
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

               <Points
                    clickPoint = {this.handleClickPoint}
               />

               <ModalPoint
                    ref = {this.modalRef}
                    addMark = {this.addMark}
               />

           </Fragment>
        );
    }
}

const mapStateToProps = ({points,firestore}) =>{

    // Comprobamos que ya se recivio informacion desde firestore
    if (Object.keys(firestore.ordered).length > 0){
        return {
            stores: firestore.ordered.points
        }
    }else{
        return {
            stores: []
        }
    }

}

const mapDispatchToProps = (dispatch) =>{
    return {
        createPoint: (newPoint) => dispatch(createPoint(newPoint))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection:'points'}
    ])
)(GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
})(MapContainer));
