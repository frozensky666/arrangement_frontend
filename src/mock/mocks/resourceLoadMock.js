const API = require("../../apis");

const resourceLoadVO = {
    "data": {
        "personnelSumLoad|0.2": 1,
        "deviceSumLoad|0.2": 1,
        "personnelLoad|1-20": [
            {
                "name": "@name",
                "load|7": [
                    {
                        "date": "@date",
                        "percent|0.2": 1
                    }
                ]
            }
        ],
        "deviceLoad|1-20": [
            {
                "name": "@name",
                "load|7": [
                    {
                        "date": "@date",
                        "percent|0.2": 1
                    }
                ]
            }
        ]
    },
    "code": 200,
    "msg": ""
};

module.exports = {
    resourceLoadDay: [API.RESOURCE_LOAD_DAY, "get", resourceLoadVO],
    resourceLoadWeek: [API.RESOURCE_LOAD_WEEK, "get", resourceLoadVO],
};
