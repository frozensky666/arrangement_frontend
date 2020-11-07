// 一个简单样例
//!!!!  请使用commonjs的语法导入导出(require/module.exports)
//!!!!  不要用es6语法导入导出(import/export)
const API = require("../../apis");

module.exports = {
    PERSONNEL_MANAGE_GET: [
        API.PERSONNEL_MANAGE,
        "get",
        {
            "code": 200,
            "msg": "",
            "data|50": [
                {
                    "personId": 1,
                    "groupId": "0",
                    "personName": "林佳奇",
                    "personPassword": "123",
                    "personAuth": 0
                }
            ]
        }
    ],
    PERSONNEL_MANAGE_CREATE: [
        API.PERSONNEL_MANAGE,
        "post",
        {
            "code": 200,
            "msg": "",
            "data": null
        }
    ],
    PERSONNEL_MANAGE_UPDATE: [
        API.PERSONNEL_MANAGE,
        "post",
        {
            "code": 200,
            "msg": "",
            "data": null
        }
    ],
    PERSONNEL_MANAGE_DELETE: [
        API.PERSONNEL_MANAGE,
        "delete",
        {
            "code": 200,
            "msg": "",
            "data": null
        }
    ],
    PERSONNEL_MANAGE_ALL_GROUPS: [
        API.PERSONNEL_MANAGE_ALL_GROUPS,
        "get",
        {
            "code": 200,
            "msg": "",
            "data": [
                "1",
                "2",
                "UKK"
            ]
        }
    ]
};
