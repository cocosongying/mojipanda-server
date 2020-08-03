const ApiReturn = require('../common/util/api_return');

class Blog {
    async getCategories(params) {
        let res = [
            {
                id: 1,
                name: "实用教程",
                order: 1,
                visible: 0,
            },
            {
                id: 2,
                name: "心情物语",
                order: 2,
                visible: 1,
            }
        ];
        return ApiReturn.success(res);
    }

    async list(params) {
        let { pageNum, cid } = params;
        let list = [];
        if (cid == 1) {
            list = [
                {
                    id: 1,
                    link: 'https://mojipanda.com/blog/d53d/',
                    title: 'FireAlpaca-免费绘画软件',
                    author: 'SongYing',
                    niceDate: '2020年5月20日',
                    envelopePic: '',
                    desc: '推荐一款免费的轻量级图像编辑和图像绘画软件',
                },
            ];
        }
        let res = {
            list: list
        }
        return ApiReturn.success(res);
    }
}

module.exports = new Blog();