import fp from 'lodash/fp';
import {upToSer} from './util/UploadUtil.js'
export default{
    'namespace':'uploadWork',
    'state':{
        //file对象
        temFiles:[],
        //是否裁切图片
        isCrop:false,
        //需要剪裁的对象
        cropItem:"",
        //是否上传图片
        shouldUp:false,
        //是否开始选择文件
        startChoose:false,
    },
    reducers:{
        AddtemFiles(state,{temFiles}){
            return fp.set('temFiles',fp.concat(state.temFiles,temFiles),state);
        },
        DelFile(state,{name}){
            return fp.set('temFiles',state.temFiles.filter(item=>item.name!=name),state);
        },
        ChangeCrop(state,{bool}){
            return fp.set('isCrop',bool,state);
        },
        AddorDelCropItem(state,{File}){
            return fp.set('cropItem',File,state);
        },
        ChangeFiles(state,{name,Item}){
           
            return fp.set('temFiles',state.temFiles.map(i=>i.name==name?Item:i),state)
        },
        clearTemFile(state){
            return fp.set('temFiles',[],state)
        },
        ChangeLoad(state,{bool}){
            return fp.set('shouldUp',bool,state)
        },
        chgChoose(state,{sta}){
            return fp.set('startChoose',sta,state)
        }
    },
    effects:{
        //添加图片
        *addAndchgFiles({temFiles},{put,select}){
            //判断file对象是否存在
            var state = yield select(state=>state.uploadWork);
            var result = filterArr(temFiles,state.temFiles,"name");
           //添加数组
           yield put({'type':'AddtemFiles',temFiles:result.addArr})
        },
        //删除文件
        *delFile({name},{put,select}){
            const data = yield select(state=>state.uploadWork)
            if(data.temFiles.length == 1){
                yield put({'type':'chgChoose',sta:false})
            }
            yield put({'type':'DelFile',name})
        },
        //改变是否裁切图片
        *didCrop(action,{put,select}){
            var state = yield select(state=>state.uploadWork);
            if(state.temFiles.length != 0){
                yield put({'type':'ChangeCrop',bool:true})
            }  
        },
        //添加剪裁对象
        *addCropItem({File},{put}){
            yield put({'type':"AddorDelCropItem",File})
        },
        //改变对象
        *changeFiles({name,Item},{put}){
            yield put({'type':"ChangeFiles",name,Item})
        },
        //停止剪裁
        *stopCrop(action,{put}){
            yield put({'type':'ChangeCrop',bool:false});
            yield put({'type':"AddorDelCropItem",File:""})
        },
        //上传至服务器
        *upToServer(action,{put,call,select}){
            yield put({'type':'ChangeLoad',bool:true})
        //    const result =  yield call(upToSer,select,put)
        },
        //上传完毕
        *upFinish(action,{put}){
            yield put({'type':'ChangeLoad',bool:false})
            yield put({'type':'clearTemFile'});
            yield put({'type':'chgChoose',sta:false})
        },
        *startChoose(action,{put}){
            yield put({'type':'chgChoose',sta:true})
        }
    }
}

function filterArr(target,state,option){
    var existArr = [];
    var addArr = [];
    for(let i = 0 ; i < target.length ;i++){
        for(let j = 0 ; j <state.length;j++){
            var isEx = false;
            if(target[i][option] == state[j][option]){
                existArr.push(target[i]);
                isEx = true;
                break;
            }
        }
        if(!isEx)  addArr.push(target[i])
    }
    return {
        existArr,
        addArr
    }
}