const ApiReturn = require('../common/util/api_return');
const StatusCode = require('../const/statusCode');
const MzituService = require('../service/mzitu');

class Mzitu {
    async list(params) {
        let list = await MzituService.list(params);
        let data = {
            list: list,
        }
        return ApiReturn.success(data);
    }

    async grid(params) {
        if (!params.id) {
            return ApiReturn.error(StatusCode.INPUT_DATA_ERR);
        }
        let list = await MzituService.grid(params);
        let data = {
            list: list,
        }
        return ApiReturn.success(data);
    }
}

module.exports = new Mzitu();