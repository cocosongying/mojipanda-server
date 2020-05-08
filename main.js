const koa = require('koa');
const router = require('koa-router')();
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const apiRouter = require('./router');
const config = require('./config');

const app = new koa();

const index = router.get('/', ctx => {
    ctx.response.body = 'hello world';
}).routes();

app.use(cors());
app.use(index);
app.use(bodyParser());
app.use(apiRouter.routes());


app.listen(config.port, () => {
    console.log(`mojipanda api server is starting at port ${config.port}`);
});