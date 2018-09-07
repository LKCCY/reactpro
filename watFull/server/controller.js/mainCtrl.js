const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

exports.getWorkInfo = (req,res)=>{
    var abPath = path.resolve(__dirname,'../moke/work.json')
    fs.readFile(abPath,function (err,docs){
        var result = JSON.parse(docs.toString());
        res.json({
            'work':result
        })
    })
}
exports.upWork = (req,res)=>{
    //上穿路径
    const abPath = path.resolve(__dirname,'../upPic');
    const form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.uploadDir = abPath;
    form.parse(req,function (err,docs,files){
        res.send('1')
    })

}