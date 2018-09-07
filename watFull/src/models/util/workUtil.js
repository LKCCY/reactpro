function* getInfo(put){
   const {work} = yield fetch('/api/workInfo').then(res=>res.json());
   return work;
}
export const getinfo = getInfo;