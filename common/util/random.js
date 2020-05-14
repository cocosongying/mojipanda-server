const DIC_TABLE = "1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0p";

class Random {
    static genStr(length) {
        let str = "";
        for (let i = 0; i < length; i++) {
            let random = Math.ceil(Math.random() * DIC_TABLE.length);
            str += DIC_TABLE[random - 1];
        }
        return str;
    }
}

module.exports = Random;