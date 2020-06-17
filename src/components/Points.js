import React, {Component, Fragment} from 'react'
import MenuLogo from "../assets/icons/menu.svg";
import CloseLogo from "../assets/icons/close.svg";
import '../assets/css/Points.css';
import Point from "./Point";

class Points extends Component{

    state = {};

    constructor(props) {
        super(props);

        const {stores} = props;

        this.state = {
            visibilitySideBar: 'hidden',    // Muestra o oculta el sidebar
            stores: stores                  // Inicia con las props que se mandan del componente padre <MapCotainer>
        }

    }

    showSideBar = () => {
        this.setState({
            visibilitySideBar:'visible'
        });
    }

    hideSideBar = () => {
        this.setState({
            visibilitySideBar:'hidden'
        });
    }

    updateStores = (stores) => {
        this.setState({
            stores:stores
        })
    }


    render() {

        const {visibilitySideBar,stores} = this.state;
        const {clickPoint}               = this.props;


        return (
            <Fragment>
                <div className="button-sidebar" onClick={this.showSideBar}>
                    <img src={MenuLogo} alt="toggle"/>
                </div>


                <div className="sidebar" style={ { visibility: visibilitySideBar} }>
                    <span className="close-button-span close-button"><img onClick={this.hideSideBar} src={CloseLogo} alt="Close"/></span>
                    { stores.map( (store,index) =>{
                        return (
                            <Point store={store} key={index} clickPoint={clickPoint}/>
                        )
                    })}

                </div>
            </Fragment>
        );
    }
}

export default Points;
