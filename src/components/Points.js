import React, {Component, Fragment} from 'react'
import MenuLogo from "../assets/icons/menu.svg";
import CloseLogo from "../assets/icons/close.svg";
import '../assets/css/Points.css';
import Point from "./Point";
import { connect } from 'react-redux';

class Points extends Component{

    state = {};

    constructor(props) {
        super(props);

        this.state = {
            visibilitySideBar: 'hidden',    // Muestra o oculta el sidebar
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {visibilitySideBar} = this.state;
        if(visibilitySideBar === 'hidden') this.showSideBar()
    }


    render() {

        const {visibilitySideBar}   = this.state;
        const {clickPoint,stores}   = this.props;


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

const mapStateToProps = ({points}) =>{
    return {
        stores:points.stores
    }
}

export default connect(mapStateToProps)(Points);
