import React, {Component, Fragment} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Points from "./Points";
import ModalPoint from "./ModalPoint";

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component {

    state = {};
    modalRef    = React.createRef(); // Referencia al componente hijo para manejar sus eventos <ModalPoint>
    pointsRef   = React.createRef(); // Referencia al componente hijo para manejar sus eventos <Points>
    markerObjects = {};

    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            currentClickPosition:{},
            visibilitySideBar : 'hidden'  ,
            stores: [{id:"145",name:"test1",latitude: 47.49855629475769, longitude: -122.14184416996333},
                {id:"40",name:"test2",latitude: 47.359423, longitude: -122.021071}],
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

        const {currentClickPosition,stores} = this.state;

        const currentDate = Date.now();

        const newMarket  = {id:currentDate,name:namePoint,date:currentDate,...currentClickPosition};

        const newStores = [...stores,newMarket];

        this.setState({
            stores:newStores
        });

        // Activamos evento del componente hijo <ModalPoint>
        this.modalRef.current.hideModal();

        // Actualizamos la lista de los puntos en el componente <Points>
        this.pointsRef.current.updateStores(newStores);

        // Crerramos el infoView
        this.onClose(null);

        // Mostramos la lista de puntos
        this.pointsRef.current.showSideBar();

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
        return this.state.stores.map((store, index) => {
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

        const {showingInfoWindow,activeMarker,selectedPlace,stores,defaultZoom,centerInMap} = this.state;
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
                    ref = {this.pointsRef}
                    stores = {stores}
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

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
})(MapContainer);
