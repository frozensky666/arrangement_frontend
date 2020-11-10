const API = require("../../apis");

module.exports = {
    ORDER_GANNT_LIST: [
        API.ORDER_GANTT_LIST,
        "get",
        {
            "data|1-20": [
                {
                    "orderId|100000-999999": 1,
                    "process|1-5": [
                        {
                            "name": "装配",
                            "percent|0.2": 1,
                            "isdelayed|0-1": 1,
							"theline|0.2": 1,
							"ddl": "@date",
                        }
                    ]
                }
            ],
            "code": 200,
            "msg": ""
        }
    ],
    ORDER_GANTT_RATE: [
        API.ORDER_GANTT_RATE,
		"get",
        {
            "data": {
                "rate|0.2": 1,
            },
            "code": 200,
            "msg": ""
        }
    ]
};