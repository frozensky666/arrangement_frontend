// 一个简单样例
//!!!!  请使用commonjs的语法导入导出(require/module.exports)
//!!!!  不要用es6语法导入导出(import/export)
const API = require("../../apis");

module.exports = {
    DEVICE_MANAGE_GET: [
        API.DEVICE_MANAGE,
        "get",
        {
            "code": 200,
            "msg": "",
            "data|50": [
                {
                    "deviceId": 1,
                    "deviceName": "移印机"
                }
            ]
        }
    ],
    DEVICE_MANAGE_CREATE: [
        API.DEVICE_MANAGE,
        "post",
        {
            "code": 200,
            "msg": "",
            "data": null
        }
    ],
    DEVICE_MANAGE_UPDATE: [
        API.DEVICE_MANAGE,
        "post",
        {
            "code": 200,
            "msg": "",
            "data": null
        }
    ],
    DEVICE_MANAGE_DELETE: [
        API.DEVICE_MANAGE,
        "delete",
        {
            "code": 200,
            "msg": "",
            "data": null
        }
    ]
};
