const MzituDB = require('../mysql/mzitu');

class Mzitu {
    async list(params) {
        let opts = {
            type: params.type,
            start: params.start || 0,
            limit: params.limit || 10
        }
        let res = await MzituDB.fingByType(opts);
        return res;
    }

    async grid(params) {
        let cols = ['id', 'url'];
        let res = await MzituDB.findByParentId(params.id, cols);
        return res;
    }
}

module.exports = new Mzitu();
