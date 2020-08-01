const ApiReturn = require('../common/util/api_return');

class Blog {
    async getCategories(params) {
        let res = [
            {
                id: 1,
                name: "实用教程",
                order: 1,
                visible: 0,
            },
            {
                id: 2,
                name: "心情物语",
                order: 2,
                visible: 1,
            }
        ];
        return ApiReturn.success(res);
    }
}

module.exports = new Blog();