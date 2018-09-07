import React, { Component } from 'react';
import './Accordion.less'
class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
    layImage(containWidth,sideWidth,drawWidth){
        var self = this;
        $('.drawer').each((index,item)=>{
            $(item).css({'left':index*sideWidth,'width':drawWidth*1.3})
        })
        $('.drawer').mouseenter(function(){
            var idx = $(this).index()+1;
            $('.drawer:lt('+idx+')').each(function(index,item){
                $(this).stop(true).animate({'left':index*sideWidth/2},1000)
            })
            $('.drawer:gt('+(idx-1)+')').each(function(index,item){
                var restWidth = containWidth - (self.props.num - idx) * (sideWidth/2);
                $(this).stop(true).animate({'left':index*sideWidth/2+restWidth},1000)
            })
        })
        $('.combine').mouseleave(function(){
            $('.drawer').each(function(a){
                $(this).stop(true).animate({'left':sideWidth*a},800)
            })
        })
    }
    componentDidMount(){
        var self = this;
         //外层的高度
         var containWidth = $('.accordion').width();
         var sideWidth = containWidth/self.props.num;
         var drawWidth = containWidth - sideWidth/2*self.props.num;
         self.layImage(containWidth,sideWidth,drawWidth)
        window.onresize = function(){
            //外层的高度
            var containWidth = $('.accordion').width();
            var sideWidth = containWidth/self.props.num;
            var drawWidth = containWidth - sideWidth/2*self.props.num;
            self.layImage(containWidth,sideWidth,drawWidth)
        }
    }
    render() { 
        const {num , Repath} = this.props;
        var postArr = new Array(num).fill(1)
        return (
            <div className='accordion'>
                <ul className='combine'>
                    {
                        postArr.map((item,index)=>{
                            return <li  className='drawer' key={index}>
                                <img src={`./source/${Repath}/poster${index+1}.jpg`} />
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
 
export default Accordion;