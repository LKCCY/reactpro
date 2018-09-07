import React, { Component } from 'react';
import SideNav from '../../components/SideNav.js';
import './Home.less';
import { Carousel } from 'react-responsive-carousel';
import {NavLink} from 'dva/router';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr:new Array(6).fill(1)
        }
    }
    render() { 
        const options={
            showThumbs:false,
            showStatus:false,
            autoPlay:true,
            interval:2500,
            dynamicHeight:true
        }
        return (
            <SideNav>
                <div className='home' >
                    <div className='home_hoke'>
                        <Carousel {...options} className='consf'>
                            {
                                this.state.arr.map((item,index)=>{
                                    return   <div className='showItem'key={index} >
                                                    <img src={`./source/home/home${index+1}.jpg`} />
                                            </div>
                                })
                            }
                        </Carousel>
                    </div>
                </div>
                <p className='linkTo'>
                    <NavLink to="/uploadWork">This is just a featured selection, click here to upload your works.</NavLink>
                </p>
            </SideNav>
        )
    }
}
 
export default Home;