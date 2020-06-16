import React, {Component, Fragment} from 'react'
import MenuLogo from "../assets/icons/menu.svg";
import CloseLogo from "../assets/icons/close.svg";
import '../assets/css/Points.css';

class Points extends Component{

    state = {
        visibilitySideBar : 'hidden'    //Show or hide sideBar from list points
    };

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


    render() {

        const {visibilitySideBar} = this.state;

        return (
            <Fragment>
                <div className="button-sidebar" onClick={this.showSideBar}>
                    <img src={MenuLogo} alt="toggle"/>
                </div>


                <div className="sidebar" style={ { visibility: visibilitySideBar} }>
                    <span className="close-button"><img onClick={this.hideSideBar} src={CloseLogo} alt="Close"/></span>
                </div>
            </Fragment>
        );
    }
}

export default Points;
