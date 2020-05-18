// const conn = require('./mongo/connection')
// const {client} = require('./mysql/connection');
// const DemoDB = require('./mongo/model/demo');
// const DemoDBMysql = require('./mysql/demo');
const RandomUtil = require('../common/util/random');
const CryptoUtil = require('../common/util/crypto');

async function main() {
    // console.log('start');
    // try {
    //     let res = await DemoDB.find();
    //     console.log(res);
    // } catch (error) {
    //     console.log(error)
    // }

    // console.log('end');
    // conn.close();

    // let res = await DemoDBMysql.getAll();
    // console.log(res);
    // client.end();
    let res = RandomUtil.genStr(18);
    console.log(res)

    let content = '123456';
    let hh = CryptoUtil.aesEncrypt(content);
    console.log(hh);
    hh = CryptoUtil.aesDecrypt("U2FsdGVkX180sTkgs1WfSWFsrFerDIaRiriveYmBkcc=");
    console.log(hh);
    hh = CryptoUtil.hmacSHA1(hh);
    console.log(hh);
}

// main()

function dateFormat(time, fmt) {
    let thisDate = new Date(time);
    var o = {
        "M+": thisDate.getMonth() + 1,
        "d+": thisDate.getDate(),
        "h+": thisDate.getHours(),
        "m+": thisDate.getMinutes(),
        "s+": thisDate.getSeconds(),
        "q+": Math.floor((thisDate.getMonth() + 3) / 3),
        "S": thisDate.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (thisDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
var time  = Date.now()
console.log(dateFormat(time, "yyyy-MM-dd hh:mm:ss"))//调用