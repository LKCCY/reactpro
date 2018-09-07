import React, { Component } from 'react';
import {connect} from 'dva';
import Cropper from 'react-cropper';
import './Croppic.less' ;
import { Button, Radio, Icon } from 'antd';

class Croppic extends Component {
    constructor(props) {
        super(props);
        this.state={
            baseUrl:''
        }
    }
    componentWillMount(){
        var self = this;
        var fr = new FileReader();
        fr.readAsDataURL(this.props.cropItem);
        fr.onload = function(e){
            self.setState({
                baseUrl:e.target.result
           })
        }
    }
    crop(){
    //剪切完毕后点击确认按钮
    var name = this.props.cropItem.name
      this.refs.cropper.getCroppedCanvas().toBlob(blob=>{
           blob.name = name;
           //关闭悬浮
           this.props.dispatch({'type':'uploadWork/stopCrop'})
           //改变file对象
           this.props.dispatch({'type':'uploadWork/changeFiles',name,Item:blob})
       })
    }
    render() { 
        const {isCrop,cropItem} = this.props;
        if(!isCrop&&cropItem.length ==0) return null; 
        return (
            <div className ='cropPic'>
                <div className='main'>
                    <Cropper
                        src={this.state.baseUrl}
                        className="cropper"
                        ref='cropper'
                        viewMode={1}
                        zoomable={false}
                        guides={true}
                        style={{width: 600}}
                        preview='.cropper-preview,ipreview'
                    />
                    <div className="btnBan" >  
                        <Button type="primary" icon="check" size='large'
                              onClick ={()=>this.crop()}
                        >
                            确认
                        </Button>   
                        <Button type="primary" icon="close" size='large'
                              onClick ={()=> this.props.dispatch({'type':'uploadWork/stopCrop'})}
                        >
                            取消
                        </Button>   
                    </div>
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
)(Croppic);