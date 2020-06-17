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

    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            currentClickPosition:{},
            visibilitySideBar : 'hidden'  ,
            stores: [{name:"test1",latitude: 47.49855629475769, longitude: -122.14184416996333},
                {name:"test2",latitude: 47.359423, longitude: -122.021071}],
            centerInMap:{
                lat:47.444,
                lng: -122.176
            },
            defaultZoom:11
        }
    }

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


        this.setState({
            currentClickPosition:newMarker
        });


    }

    /* Evento que manda a llamar el componente hijo <ModalPoint> */
    addMark = (namePoint) => {

        const {currentClickPosition,stores} = this.state;

        const currentDate = Date.now();

        const newMarket  = {name:namePoint,date:currentDate,...currentClickPosition};

        const newStores = [...stores,newMarket];

        this.setState({
            stores:newStores
        });

        // Activamos evento del componente hijo <ModalPoint>
        this.modalRef.current.hideModal();

        // Actualizamos la lista de los puntos en el componente <Points>
        this.pointsRef.current.updateStores(newStores);

    }

    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
            return <Marker key={index} id={index} name={store.name} position={{
                lat: store.latitude,
                lng: store.longitude
            }}
           onClick={this.onMarkerClick} />
        })
    }

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
    apiKey: 'AIzaSyDMaqUH_aztx7Veu40W8u_BNRQ6GL26vEA'
})(MapContainer);
