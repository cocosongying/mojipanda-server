const CryptoJs = require('crypto-js');
const AES_KEY = 'cglc80qphkh18cllie';
const HMACSHA1_KEY = 'vs7oadmveey46exu97';

class CryptoUtil {
    static aesDecrypt(data, key) {
        let res = CryptoJs.AES.decrypt(data, key || AES_KEY);
        return res.toString(CryptoJs.enc.Utf8);
    }

    static aesEncrypt(data, key) {
        let res = CryptoJs.AES.encrypt(data, key || AES_KEY);
        return res.toString();
    }

    static hmacSHA1(data, key) {
        let res = CryptoJs.HmacSHA1(data, key || HMACSHA1_KEY);
        return res.toString();
    }
}

module.exports = CryptoUtil;