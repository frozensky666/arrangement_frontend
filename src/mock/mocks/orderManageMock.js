// 一个简单样例
//!!!!  请使用commonjs的语法导入导出(require/module.exports)
//!!!!  不要用es6语法导入导出(import/export)
const API = require("../../apis");

module.exports = {
    ORDER_INFO_GET: [
        API.ORDER_MANAGE,
        "get",
        {
            "code": 200,
            "msg": "",
            "data|50": [
                {
                    "orderId|+1": 1,
                    "materialId": 1,
                    "orderNum": 1000,
                    "orderDeadline": "2018-10-14"
                }
            ]
        }
    ],
    ORDER_INFO_CREATE: [
        API.ORDER_MANAGE,
        "post",
        {
            "code": 200,
            "msg": "",
            "data": null
        }
    ],
    ORDER_INFO_UPDATE: [
        API.ORDER_MANAGE,
        "post",
        {
            "code": 200,
            "msg": "",
            "data": null
        }
    ],
    ORDER_INFO_DELETE: [
        API.ORDER_MANAGE,
        "delete",
        {
            "code": 200,
            "msg": "",
            "data": null
        }
    ]
};
