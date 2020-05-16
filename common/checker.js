const log = require('./util/log')(__filename);
const StatusCode = require('../const/statusCode');

function checker(filters) {
    return async function (ctx, next) {
        let request = ctx.request;
        let response = ctx.response;
        let params = request.method === "POST" ? request.body : request.query;
        try {
            for (let filter of filters) {
                let path = filter[0];
                let func = filter[1];
                if (request.originalUrl.indexOf(path) >= 0) {
                    let result = await func(params, request, response);
                    if (result) {
                        await next();
                        return;
                    }
                }
            }
            ctx.set('Content-Type', 'application/json');
            response.body = { code: StatusCode.TOKEN_ERR };
        } catch (error) {
            dealErr(ctx, response, error);
        }
    }
}

// 处理异常的返回
function dealErr(ctx, response, error) {
    log.error("some error with stack info '%s'", error.stack)
    ctx.set('Content-Type', 'application/json');
    response.body = { code: StatusCode.INTERNAL_ERR };
}

module.exports = checker;