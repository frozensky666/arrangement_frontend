// 一个简单样例
//!!!!  请使用commonjs的语法导入导出(require/module.exports)
//!!!!  不要用es6语法导入导出(import/export)
const API = require("../../apis");

module.exports = {
    CURRENT_TIME_GET: [
        API.SIMULATE_TIME,
        "get",
        {
            "code": 200,
            "msg": "2018-10-04T00:00:00",
            "data": []
        }
    ],
    CURRENT_TIME_SET: [
        API.SIMULATE_TIME+"/:t",
        "get",
        {
            "code": 200,
            "data": "2018-10-09T12:00:00",
            "msg": ""
        }
    ],
    FAST_MODE_GET: [
        API.FAST_MODE,
        "get",
        {
            "code": 200,
            "data": true,
            "msg": ""
        }
    ],
    FAST_MODE_SET: [
        API.FAST_MODE_TOGGLE,
        "get",
        {
            "code": 200,
            "data": false,
            "msg": ""
        }
    ],
};
