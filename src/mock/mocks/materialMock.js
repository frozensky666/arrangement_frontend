// 一个简单样例
//!!!!  请使用commonjs的语法导入导出(require/module.exports)
//!!!!  不要用es6语法导入导出(import/export)
const API = require("../../apis");

module.exports = {
    MATERIAL_ALL: [
        API.MATERIAL_ID,
        "get",
        {
            "code": 200,
            "msg": "",
            "data": [
                1,
                2,
                3
            ]
        }
    ]
};
