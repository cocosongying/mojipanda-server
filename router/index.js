const HelloWorld = require('../controller/helloworld');

const hello = [
    ["/hello", HelloWorld.content],
];

module.exports = [
    [hello, "/hello"],
];