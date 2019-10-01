const router = require('koa-router')();
const HelloWorldCtrl = require('../controller/hello/helloWorld');

router.get('/hello', HelloWorldCtrl.content);

module.exports = router;