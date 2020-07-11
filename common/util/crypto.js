const CryptoJs = require('crypto-js');
const AES_KEY = 'cglc80qphkh18cllie';
const HMACSHA1_KEY = 'vs7oadmveey46exu97';

class CryptoUtil {
    static aesDecrypt(data, key) {
        try {
            let res = CryptoJs.AES.decrypt(data, key || AES_KEY);
            return res.toString(CryptoJs.enc.Utf8);
        } catch (error) {
            return null;
        }
    }

    static aesEncrypt(data, key) {
        try {
            let res = CryptoJs.AES.encrypt(data, key || AES_KEY);
            return res.toString();
        } catch (error) {
            return null;
        }
    }

    static hmacSHA1(data, key) {
        try {
            let res = CryptoJs.HmacSHA1(data, key || HMACSHA1_KEY);
            return res.toString();
        } catch (error) {
            return null;
        }
    }
}

module.exports = CryptoUtil;