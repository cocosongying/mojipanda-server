// const conn = require('./mongo/connection')
// const {client} = require('./mysql/connection');
// const DemoDB = require('./mongo/model/demo');
// const DemoDBMysql = require('./mysql/demo');
const RandomUtil = require('./common/util/random');

async function main() {
    // console.log('start');
    // try {
    //     let res = await DemoDB.find();
    //     console.log(res);
    // } catch (error) {
    //     console.log(error)
    // }

    // console.log('end');
    // conn.close();

    // let res = await DemoDBMysql.getAll();
    // console.log(res);
    // client.end();
    let res = RandomUtil.genStr(18);
    console.log(res)
}

main()