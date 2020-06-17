import React,{Component,Fragment} from 'react'
import '../assets/css/Point.css'

import IMAGE from '../assets/icons/menu.svg'

class Point extends Component{
    render() {
        return (
            <Fragment>
                <div className="wrapper-point">
                    <div className="image-point"><img src={IMAGE} alt="test"/></div>
                    <div className="content-point">
                        <div className="wrapper-content">
                            <div className="name-point">Las norias 229</div>
                            <div className="date-point">16-06-2020</div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Point;
