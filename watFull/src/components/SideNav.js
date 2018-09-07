import React, { Component } from 'react';
import './SideNav.less';
import {NavLink} from 'dva/router';
import imagesloaded from 'imagesloaded';
class SideNav extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        $(".rout").each((index,item)=>{
            if($(item).data('url') == window.location.hash.substr(1)){
                $(item).addClass('cur')
            }
        })
        var self = this;
        $(this.refs.content).imagesLoaded().always( function( instance ) {
          setTimeout(() => {
            $('.ss li').removeClass()
          },300);
       })
    }
    render() { 
        return (
            <div className="sidesNav">
                <div className='sidesNav_nav'>
                    <div className="title">ERIK JOHANSSON</div>
                    <div className='detail'>SURREAL PHOTOGRAPHY</div>
                    <ul className='ss'>
                        <li data-url ="/"  className='rout'>
                             <NavLink  className='showPic' to="/">FEATURED</NavLink>
                        </li>
                        <li data-url ="/work"  className='rout'>
                             <NavLink  className='showPic' to="/work">PROJECTS 2008 - 2018</NavLink>
                        </li>
                        <li data-url ="/uploadWork" className='rout' >
                             <NavLink  className='showPic' to="/uploadWork">UPLOAD WORK</NavLink>
                        </li>
                    </ul>
                    <ul className='bot'>
                        <li>NEWS</li>
                        <li>EXHIBITIONS / EVENTS</li>
                        <li>BEHIND THE SCENES</li>
                    </ul>
                </div>
                <div className="sidesNav_content" ref="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
 
export default SideNav;

                

                
         
                

                
                   