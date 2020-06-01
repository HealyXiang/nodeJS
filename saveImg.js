var http = require('http');
var cheerio = require('cheerio');
var https = require('https');
var fs = require('fs');
var iconv = require('iconv-lite');

const imgUrl = 'http://img.ivsky.com/img/tupian/pre/201808/21/huise_xiaomao-012.jpg';
const doubanImg = 'https://img3.doubanio.com/view/photo/l/public/p850528625.webp';
const pageUrl = 'http://www.ivsky.com/search.php?q=%E7%8C%AB';
const BASE_URL = 'http://img.ivsky.com/img/tupian/pre/201808/';
const imgUrls = [];
let imgNames = [];

function getImg(imgName) {
    http.get(`${BASE_URL}${imgName}`, function (req, res) { //path为网络图片地址
        var imgData = '';
        req.setEncoding('binary');
        req.on('data', function (chunk) {
            imgData += chunk;
        })
        req.on('end', function () {
            fs.writeFile(`./img/${imgName.slice(3)}`, imgData, 'binary', function (err) { //path为本地路径例如public/logo.png
                if (err) {
                    console.log(err);
                    console.log('保存出错!')
                } else {
                    console.log('保存成功!')
                }
            })
        })
    })
}

// function getPage(pageUrl) {
http.get(pageUrl, function (sres) {
    var chunks = [];
    sres.on('data', function (chunk) {
        //  console.log('chunk', chunk)
        chunks.push(chunk);
    });
    // chunks里面存储着网页的 html 内容，将它zhuan ma传给 cheerio.load 之后
    // 就可以得到一个实现了 jQuery 接口的变量，将它命名为 `$`
    // 剩下就都是 jQuery 的内容了
    sres.on('end', function () {
        //由于咱们发现此网页的编码格式为gb2312，所以需要对其进行转码，否则乱码
        //依据：“<meta http-equiv="Content-Type" content="text/html; charset=gb2312">”
        var html = iconv.decode(Buffer.concat(chunks), 'utf-8');
        var $ = cheerio.load(html, {
            decodeEntities: false
        });
        // console.log($('div.il_img > img'))
        $('div.il_img img').each(function (i, element) {
            var $element = $(element).attr('src');
            imgUrls.push($element);
        })
        console.log(imgUrls);
        imgNames = imgUrls.map(function (item, i) {
            return item.slice(41);
        });
        console.log(imgNames);
        imgNames.map((val) => {
            console.log(val);
            getImg(val);
        })
    });
});
// }

// function getImg (imgName) {
//     http.get(`${BASE_URL}${imgName}`,function(req,res){  //path为网络图片地址
//     var imgData = '';
//     req.setEncoding('binary');
//     req.on('data',function(chunk){
//         imgData +=chunk;
//     })
//     req.on('end',function(){
//         fs.writeFile(`./img/${imgName}`,imgData,'binary',function(err){  //path为本地路径例如public/logo.png
//         if(err) {
//             console.log(err);
//             console.log('保存出错!')
//         } else {
//             console.log('保存成功!')
//         }
//         })
//     })
//     })
// }

// imgNames.map((val) => {
//     console.log(val);
//     getImg(val);
// })