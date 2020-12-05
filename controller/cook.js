const fs = require('fs');
const ApiReturn = require('../common/util/api_return');
const File = require('../common/util/file');
const Random = require('../common/util/random');
const MinioService = require('../service/minio');
const CookService = require('../service/cook');

async function upload(file, name) {
    // 获取文件流
    let stream = fs.createReadStream(file.path);
    // 上传文件到minio
    await MinioService.putObject("public", `cook/${name}`, stream);
    // 删除本地临时文件
    fs.unlinkSync(file.path);
}

class Cook {
    async add(params, request) {
        let now = Date.now();
        let prefix = Random.genStr(8);
        // 需要保存的项
        let info = {
            name: params.name,
        };
        // 文件上传封面和详情
        if (request.files.cover) {
            let file = request.files.cover;
            let ext = File.fileExt(file.name);
            let name = `${prefix}_cover_${now}.${ext}`;
            await upload(file, name);
            info.cover = name;
        }
        if (request.files.detail) {
            let file = request.files.detail;
            let ext = File.fileExt(file.name);
            let name = `${prefix}_detail_${now}.${ext}`;
            await upload(file, name);
            info.detail = name;
        }
        await CookService.add(info);
        return ApiReturn.success();
    }

    async detail(params) {
        let res = await CookService.detail(params);
        return ApiReturn.success(res);
    }

    async list(params) {
        let list = await CookService.list(params);
        let data = {
            list: list
        }
        return ApiReturn.success(data);
    }

    async update(params, request) {
        await CookService.update(params);
        return ApiReturn.success();
    }

    async delete(params) {
        await CookService.delete(params);
    }
}

module.exports = new Cook();