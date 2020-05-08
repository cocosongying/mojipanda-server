const ApiReturnUtil = require('../../util/apiReturnUtil');

class helloWorld {
    async content(ctx) {
        let data = { 
            content: "Hello World!"
        };
        ctx.body = await ApiReturnUtil.ok(data);
    }
}

module.exports = new helloWorld();