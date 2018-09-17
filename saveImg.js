var http = require('http');
var https = require('https');
var fs = require('fs');

const imgUrl = 'http://img.ivsky.com/img/tupian/pre/201808/21/huise_xiaomao-012.jpg';
const doubanImg = 'https://img3.doubanio.com/view/photo/l/public/p850528625.webp';

http.get('http://img.ivsky.com/img/bizhi/pre/201806/17/baise_xuejing.jpg',function(req,res){  //path为网络图片地址
  var imgData = '';
  req.setEncoding('binary');
  req.on('data',function(chunk){
    imgData += chunk
  })
  req.on('end',function(){
    fs.writeFile('./img/fengjing.jpg',imgData,'binary',function(err){  //path为本地路径例如public/logo.png
      if(err) {
        console.log(err);
        console.log('保存出错！')
    } else {
        console.log('保存成功!')
      }
    })
  })
})