class helloWorld {
    async content(ctx) {
        let data = {};
        ctx.body = {
            code: 0,
            data: data
        };
    }
}

module.exports = new helloWorld();