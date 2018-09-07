import {getinfo} from '../util/workUtil.js';
import fp from 'lodash/fp';
export default{
    namespace:'work',
    state:{
        workPic:[]
    },
    reducers:{
        addWorkPic(state,{workPic}){
           return fp.set("workPic",workPic,state);
        }
    },
    effects:{
        *fetchInit(action,{put,call}){
           const workPic = yield call(getinfo);
           yield put({'type':'addWorkPic',workPic})
        }
    } 
}