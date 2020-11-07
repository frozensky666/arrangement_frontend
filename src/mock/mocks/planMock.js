const API = require("../../apis");

module.exports = {
    PLAN: [
        API.PLAN,
        "post",
        {
            "code": 200,
            "msg": "",
            "data": null
        }
    ],
    PLAN_SUBORDER: [
        API.PLAN_SUBORDER,
        "get",
        {
            "code|200": 1,
            "msg": "",
            "data|10": [
                {
                    "orderId": 1,
                    "orderNum": 100,
                    "orderDeadline": "2018-10-04",
                    "subOrders|5": [
                        {
                            "workId": 1,
                            "num": 10,
                            "endTime": "2018-10-01T08:00:00"
                        }
                    ]
                }
            ]
        }

    ],
    PLAN_PRODUCTION: [
        API.PLAN_PROD,
        "get",
        {
            "code": 200,
            "msg": "",
            "data": {
                "workId": 1,
                "num": 100,
                "endTime": "2018-10-01T08:00:00",
                "lineName": "line1",
                "devices|3": [
                    {
                        "deviceId": 1,
                        "deviceName": "移印机"
                    }
                ],
                "persons|10": [
                    {
                        "personId": 1,
                        "groupId": "1",
                        "personName": "林佳奇"
                    }
                ]
            }
        }

    ]
};
