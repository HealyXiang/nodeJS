const cheerio = require('cheerio');
const https = require('https');
const iconv = require('iconv-lite');
const fs = require('fs');

const targetUrl = 'https://www.douban.com/group/topic/178276113/';
const headers = {
    Cookie: ''
};

function getInfo() {

}

const options = {
    method: 'GET',
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
        'Cookie': 'gr_user_id=9f62305f-792c-4576-a08f-0fa84188be27; _ga=GA1.2.899472134.1501576380; _vwo_uuid_v2=13E57AB708E0FBE77EF934DCDB99135C|002591fd32115ae3443b8b307668da68; __utmv=30149280.6988; douban-fav-remind=1; ll="118282"; bid=mqmVivNp45Y; __gads=ID=af1a81f15072175d:T=1566403499:S=ALNI_MaBUrPImXptCA5qP1WcEuie7uLo-g; __yadk_uid=CeY6afqw8HmIojyR6ZB7S9eVKCvgCnq0; trc_cookie_storage=taboola%2520global%253Auser-id%3D3715b1b6-55f6-4fec-8b03-9cb87c0db761-tuct456f169; viewed="30275499_10555435_3079193_4898645_25768396_25870705"; __utmc=30149280; dbcl2="69880157:nqdWR7F0c5o"; ck=9xnM; push_noty_num=0; push_doumail_num=0; __utmz=30149280.1590943466.137.12.utmcsr=localhost:56129|utmccn=(referral)|utmcmd=referral|utmcct=/python/douban_data.html; ap_v=0,6.0; _pk_ref.100001.8cb4=%5B%22%22%2C%22%22%2C1591020696%2C%22http%3A%2F%2Flocalhost%3A56129%2Fpython%2Fdouban_data.html%3F_ijt%3Dtr2nib18slnfjlq72vchl86306%22%5D; __utma=30149280.899472134.1501576380.1591017367.1591020697.139; _pk_id.100001.8cb4=4b88b148651aa2e7.1501576379.92.1591020807.1591017664.',
        'Referer': 'https://www.douban.com/group/'
    }
};

const req = https.request(targetUrl, options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    var chunks = [];
    res.on('data', (chunk) => {
        // console.log(`响应主体: ${chunk}`);
        chunks.push(chunk);
    });
    res.on('end', () => {
        console.log('响应中已无数据');
        // const html = iconv.decode(chunks.join(''));
        const html = chunks.join('');
        // console.log('html:', html);
        const $ = cheerio.load(html, {
            decodeEntities: false
        });
        const text = $('script[type="application/ld+json"]').html();
        console.log(text.replace(/\r\n/g, ''));
        const pureText = JSON.parse(text.replace(/[\r\n]/g, ''));
        console.log('pureText:', pureText);
        console.log('type text:', typeof text);
        console.log('text length:', text.length);
        console.log('text value:', pureText.text);
    });
});

req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
});

// 将数据写入请求主体。
// req.write(postData);
req.end();