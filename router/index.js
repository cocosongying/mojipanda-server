const HelloWorld = require('../controller/helloWorld');

const hello = [
    ["/hello", HelloWorld.content],
];

module.exports = [
    [hello, "/hello"],
];