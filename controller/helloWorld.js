const ApiReturn = require('../common/util/api_return');

class HelloWorld {
    async content(params) {
        let data = { 
            content: "Hello World!"
        };
        return ApiReturn.success(data);
    }
}

module.exports = new HelloWorld();