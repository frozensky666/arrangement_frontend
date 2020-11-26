// 一个简单样例
//!!!!  请使用commonjs的语法导入导出(require/module.exports)
//!!!!  不要用es6语法导入导出(import/export)
const API = require("../../apis");

module.exports = {
    
    SWITCH_PROJECT_GET: [
        API.SWITCH_GET,
        "get",
        {
            "code": 200,
            "msg": "",
            "data|0-1": 1,
        }
    ],
    SWITCH_PROJECT_SET: [
        API.SWITCH_POST,
        "post",
        {
            "code": 200,
            "msg": "",
            "data": null,
        }
    ],
};
