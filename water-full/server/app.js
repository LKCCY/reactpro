const express = require('express');
const app = express();
const mainCtrl = require('./controller.js/mainCtrl.js')
app.get('/workInfo',mainCtrl.getWorkInfo);
app.post('/upWork',mainCtrl.upWork);
app.listen(3000,function(){
    console.log('3000端口已开')
})