import React, { Component } from 'react';
import SideNav from '../../components/SideNav.js';
import {connect} from 'dva';
import './Work.less';
import Masonry from 'react-masonry-component';
class Work extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        //发起异步请求
        this.props.dispatch({'type':'work/fetchInit'})
    }
    render() { 
       if(this.props.workPic.length == 0 ) return null;
        return (
            <SideNav>   
                <Masonry
                    className={'workPic'}
                    elementType={'div'} 
                    disableImagesLoaded={false}
                    updateOnEachImageLoad={false} 
                 >
                    {
                        this.props.workPic.map(item=>{
                            return  <div className="gridItem" key={item.id}>
                                <img  src={item.url}/>
                            </div>
                        })
                    }
                 </Masonry>
              
            </SideNav>
        );
    }
}
 
export default connect(
    ({work})=>({
        workPic:work.workPic,
    })
)(Work);