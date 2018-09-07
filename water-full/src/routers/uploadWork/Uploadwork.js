import React, { Component } from 'react';
import Uppic from './components/Uppic.js';
import ShowPic from './components/ShowPic.js';
import Croppic from './components/Croppic.js';
import {connect} from 'dva';
import './Uploadwork.less';
class Uploadwork extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {isCrop,cropItem} = this.props;
        return (  
            <div >
                    <div className='uploadwork'>
                        <Uppic></Uppic>
                        <ShowPic></ShowPic>
                        {
                            !isCrop||cropItem.length ==0?null:
                            <Croppic></Croppic>
                        }
                    </div>
            </div>
        )
    }
}
 
export default connect(
    ({uploadWork})=>({
        isCrop:uploadWork.isCrop,
        cropItem:uploadWork.cropItem
    })
)(Uploadwork) 