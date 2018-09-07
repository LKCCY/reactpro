function* upServer(select,put){
    //提取文件中的数据
    var state = yield select(state=>state.uploadWork);
    var data = state.temFiles;
    var total = data.length;
    for(var i = 0 ;i <data.length ;i++){
        var fd = new FormData();
        fd.append('tupian',data[i],data[i].name);
        yield fetch('/api/upWork',{
            method:'POST',
            body:fd
        })
    }
    //提供数字
    yield put({'type':'upFinish'})
}
export const upToSer = upServer;