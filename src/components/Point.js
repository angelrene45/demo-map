import React,{Component,Fragment} from 'react'
import '../assets/css/Point.css'

import IMAGE from '../assets/icons/point.svg'
import REMOVE from '../assets/icons/remove.svg'
import Moment from 'react-moment';
import 'moment/locale/es';

class Point extends Component{

    state = {};

    render() {

        const {store,clickPoint,removePoint} = this.props;

        const {name,date} = store;

        return (
            <Fragment>
                <div className="wrapper-point" onClick={clickPoint(store)}>
                    <div className="image-point"><img src={IMAGE} alt="point"/></div>
                    <div className="content-point">
                        <div className="wrapper-content">
                            <div className="name-point">{name}</div>
                            <div className="delete-point"><img src={REMOVE} alt="remove" onClick={removePoint(store)}/></div>
                            <div className="date-point"><Moment interval={30000} fromNow>{date}</Moment></div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Point;
