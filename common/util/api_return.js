const StatusCode = require('../../const/statusCode');

class ApiReturn {
    static success(data) {
        return { code: StatusCode.OK, data: data || {} };
    }
    static error(data) {
        return { code: StatusCode.ERR, data: data || {} };
    }
}

module.exports = ApiReturn;