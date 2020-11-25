const API = require("../../apis");

const planOverviewVO = {
    "code|200": 1,
    "msg": "",
    "data": {
        "submitRate|0.2": 1,
        "deviceUseRate|0.2": 1,
        "deviceLoadRate|0.2": 1,
        "personLoadRate|0.2": 1,
        "orderPlans|3-5": [
            {
                "orderId|1": 1,
                "orderNum|100-200": 1,
                "orderDeadline": "@date",
                "planDeadline": "@date",
                "plans|3-5": [
                    {
                        "date": "@date",
                        "production|0.2": 1
                    }
                ]
            }
        ]
    }
};

module.exports = {
    PLAN_OVERVIEW : [API.PLAN_OVERVIEW,"get",planOverviewVO]
};
