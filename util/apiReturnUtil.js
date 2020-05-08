const ApiReturnCode = require('../const/apiReturnCode');

class apiReturnUtil {
    async ok(data) {
        return {
            code: ApiReturnCode.OK,
            data: data || {}
        };
    }

    async err(data, code) {
        return {
            code: code || ApiReturnCode.ERR,
            data: data || {}
        }
    }
}

module.exports = new apiReturnUtil();