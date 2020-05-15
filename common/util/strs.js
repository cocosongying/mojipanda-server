class Strs {
    static getFields(cols, fields) {
        if (Array.isArray(cols) && cols.length > 0) {
            return cols
        } else if (Array.isArray(cols) && cols.length == 0) {
            return fields
        } else if (cols) {
            return [cols]
        } else {
            return fields
        }
    }
}

module.exports = Strs;