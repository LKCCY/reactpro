import React, { Component } from 'react';
import {connect} from 'dva';
import './Showpic.less';
import cn from 'classnames';
import { Progress } from 'antd';
class ShowPic extends Component {
    constructor(props) {
        super(props);
        this.state={
            total:0,
            now:0,
        }
    }
    transBase(index,file){
        var fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = function(e){
            $('.picItem').eq(index).css({
                'backgroundImage':"url('"+e.target.result+"') "
            })
        }
    }
    componentDidUpdate(){
        $('.mask').on('click','.picItem',function(){
            $(this).removeClass('cover')
        })
    }
    //上传图片
    componentWillReceiveProps(nextProps){
        var self = this;
        //如何接受上穿后开始上传
        if(nextProps.shouldUp){
            //计算数据总量
            var  total = 0;
            var now = 0;
            //计算总个数
            var Amount =  nextProps.temFiles.length;
            var amount = 0;
            nextProps.temFiles.forEach((item,index)=>{
                total += item.size;
                var fd = new FormData();
                fd.append('tupian',item,item.name);
                //创建小黄人
                var xhr = new XMLHttpRequest();
                xhr.open('post','/api/upWork',true);
                xhr.upload.onprogress = function(e){
                 self.setState(prev=>({
                    now:prev.now + e.loaded
                 }))
                }
                xhr.send(fd);
                xhr.onreadystatechange = function(){
                    if(xhr.readyState == 4){
                        amount ++;
                        if(amount == Amount){
                            setTimeout(function(){
                                self.props.dispatch({type:'uploadWork/upFinish'})
                            },1000)
                        }
                    }
                }
            })
            this.setState({
                total
            })
        }
    }
    render() { 
        const {temFiles,dispatch,isCrop,shouldUp} = this.props;
        if(temFiles.length == 0 ) return null;
        var resultArr = [];
        temFiles.forEach((item,index)=>{
            this.transBase(index,item)
            resultArr.push(
                     <div  key={index} className={cn({'cover':isCrop,"picItem":true})}
                        onClick={()=>{if(isCrop) dispatch({type:'uploadWork/addCropItem',File:item})}}
                     >
                        <i className={cn({'closeBtn':!isCrop})}
                            onClick={()=>{
                                dispatch({'type':'uploadWork/delFile','name':item.name})
                            }}
                        ></i>
                     </div>
            )
        })

        return ( 
            <div className='showPic'>
                <div className='mask'>
                    {
                        resultArr
                    }
                </div>
                {
                   shouldUp?
                    <Progress className='porbar' type="circle" 
                        percent={Math.round(this.state.now/this.state.total*100)}
                        width={80} 
                     />
                    :null
                 }
            </div>
        )
    }
}
 
export default connect(
    ({uploadWork})=>({
        temFiles:uploadWork.temFiles,
        isCrop:uploadWork.isCrop,
        shouldUp:uploadWork.shouldUp
    })
)(ShowPic) ;