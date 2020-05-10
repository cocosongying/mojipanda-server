const ApiReturn = require('../common/util/apiReturn');

class HelloWorld {
    async content(params) {
        let data = { 
            content: "Hello World!"
        };
        return ApiReturn.success(data);
    }
}

module.exports = new HelloWorld();