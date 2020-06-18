import React, {Component, Fragment} from 'react'
import MenuLogo from "../assets/icons/menu.svg";
import CloseLogo from "../assets/icons/close.svg";
import '../assets/css/Points.css';
import Point from "./Point";
import {connect} from 'react-redux';
import {firestoreConnect} from "react-redux-firebase";
import {compose} from 'redux';

class Points extends Component {

    state = {};

    constructor(props) {
        super(props);

        this.state = {
            visibilitySideBar: 'hidden'  // Muestra o oculta el sidebar
        }

    }

    showSideBar = () => {
        this.setState({
            visibilitySideBar: 'visible'
        });
    }

    hideSideBar = () => {
        this.setState({
            visibilitySideBar: 'hidden',
        });
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        // Si es un cambio de las props por el reducer mostramos el sideBar
        if (prevProps.stores.length !== this.props.stores.length) {
            const {visibilitySideBar} = this.state;
            if (visibilitySideBar === 'hidden') this.showSideBar()
        }
    }


    render() {

        const {visibilitySideBar} = this.state;
        const {clickPoint, stores} = this.props;

        return (
            <Fragment>
                <div className="button-sidebar" onClick={this.showSideBar}>
                    <img src={MenuLogo} alt="toggle"/>
                </div>

                <div className="sidebar" style={{visibility: visibilitySideBar}}>
                    <span className="close-button-span close-button"><img onClick={this.hideSideBar} src={CloseLogo}
                                                                          alt="Close"/></span>
                    {stores.map((store, index) => {
                        return (
                            <Point store={store} key={index} clickPoint={clickPoint}/>
                        )
                    })}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = ({firestore}) => {
    if (Object.keys(firestore.ordered).length > 0) { /* Validacion que contenga informacion la colleccion de points */
        return {
            stores: firestore.ordered.points
        }
    } else {
        return {
            stores: []
        }
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'points'} /* Obtenemos toda la collecion de points para mandarla a las props */
    ])
)(Points);
