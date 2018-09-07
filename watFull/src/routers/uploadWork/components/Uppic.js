import React, { Component } from 'react';
import './Uppic.less';
import {connect} from 'dva';
import cn from 'classnames';
class Uppic extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        var self =this;
        this.refs.fileBtn.onchange = function(event){
            var temFiles = self.refs.fileBtn.files;
            //将file对象传送至model
            self.props.dispatch({'type':'uploadWork/addAndchgFiles',temFiles})
        }
        this.refs.fileContent.ondragover = function(e){
            e.preventDefault();
            $('.subDrag').css({'boxShadow':'inset 3px 3px 10px rgb(178, 163, 163)'})

        }
        this.refs.fileContent.ondragleave = function(e){
            e.preventDefault();
            $('.subDrag').css({'boxShadow':''})

        }
        this.refs.fileContent.ondrop = function(e){
            $('.subDrag').css({'boxShadow':''})
            e.preventDefault();
            if(e.dataTransfer.files.length != 0){
                //将file对象传送至model
                 self.props.dispatch({'type':'uploadWork/addAndchgFiles',temFiles:e.dataTransfer.files})
            }
        }
    }
    selectFile(){
        $(this.refs.fileBtn).trigger('click');
        this.props.dispatch({'type':'uploadWork/startChoose'})
    }
    calSize(files){
        var total = 0;
        files.forEach(item=>total+=item.size);
        if(total/1024 < 1024){
            return Math.round(total / 1024) + 'k'
        }else if(total/1024/1024 < 1024){
            return Math.round(total/1024/1024) + 'M'
        }
    }
    render() { 
        const {dispatch,isCrop,temFiles} = this.props;
        return (
            <div className='uploadPic'>
                <div className='head'>
                    <div className='subBtn'>
                        <input type="file" 
                            multiple="multiple"
                            ref='fileBtn'
                        hidden/>
                        <i></i>
                        <p 
                            onClick={()=>this.selectFile()}
                        >点击选中文件</p>
                    </div>
                    <div className='subDrag'
                        ref='fileContent'
                    >
                        或者将文件托至此处
                    </div>
                </div>
                <div className='footer'>
                    <div className='size'>
                        {
                           temFiles.length == 0 ?null:
                           <span> 共{temFiles.length}张</span>    
                        }
                        {
                           temFiles.length == 0 ?null:
                           <span> 共{this.calSize(temFiles)}</span>    
                        }
                    </div>
                    <div className='submit'>
                        <p
                            onClick={()=>dispatch({'type':"uploadWork/didCrop"})}
                            className={cn({'cur':isCrop})}
                        >裁剪图片</p>
                        <p
                            onClick={()=>dispatch({'type':"uploadWork/upToServer"})}
                        >开始上传</p>
                    </div>
                </div>
            </div>
        )
    }
}
 
export default connect(
    ({uploadWork})=>({
        isCrop:uploadWork.isCrop,
        temFiles:uploadWork.temFiles
    })
)(Uppic);