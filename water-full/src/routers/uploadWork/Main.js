import React, { Component } from 'react';
import {connect} from 'dva'
import SideNav from '../../components/SideNav.js';
import Uploadwork from './Uploadwork.js';
import Accordion from '../../components/Accordion.js';
import './Main.less'
class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        const {startChoose} = this.props
        return (
            <SideNav>
                <div className='main'>
                    <Uploadwork></Uploadwork>
                    {
                        startChoose?null:
                        <div className='paino'>
                            <Accordion
                                num={6}
                                Repath ={'poster'}
                            ></Accordion>
                            <p>
                                COMMISSIONED
                            </p>
                        </div>
                    }
                </div>
            </SideNav>
        )
    }
}
 
export default connect(
    ({uploadWork})=>({
        startChoose:uploadWork.startChoose
    })
)(Main);