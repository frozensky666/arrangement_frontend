const API = require("../../apis");

const resourceGanttVO = {
    data: [
        {
            role: "小明",
            plan: [
                {
                    start: '2018/11/09 7:23',
                    end: '2018/11/09 8:45',
                    value: '125678912',
                    orderId: 0,
                    materialId: 0,
                    delay :true
                    // bg: 'green'
                },
                {
                    start: '2018/11/09 12:23',
                    end: '2018/11/09 18:45',
                    value: '755529799',
                    orderId: 0,
                    materialId: 0,
                    delay :false
                    // bg: 'blue'
                },
                {
                    start: '2018/11/09 19:55',
                    end: '2018/11/10 0:45',
                    value: '125678912',
                    orderId: 0,
                    materialId: 0,
                    delay :true
                    // bg: 'yellow'
                },
                {
                    start: '2018/11/10 1:28',
                    end: '2018/11/10 7:00',
                    value: '413131313',
                    orderId: 0,
                    materialId: 0,
                    delay :false
                    // bg: 'red'
                },
            ]
        },
        {
            role: "小芳",
            plan: [
                {
                    start: '2018/11/09 7:00',
                    end: '2018/11/09 16:00',
                    value: '554979844',
                    orderId: 0,
                    materialId: 0,
                    delay :false
                    // bg: 'red'
                },
            ]
        },
        {
            role: "小王",
            plan: [
                {
                    start: '2018/11/09 15:00',
                    end: '2018/11/09 16:00',
                    value: '554979844',
                    orderId: 0,
                    materialId: 0,
                    delay :false
                    // bg: 'red'
                },
            ]
        },
        {
            role: "小红",
            plan: [
                {
                    start: '2018/11/09 7:00',
                    end: '2018/11/09 9:00',
                    value: '554979844',
                    orderId: 0,
                    materialId: 0,
                    delay :false
                    // bg: 'red'
                },
                {
                    start: '2018/11/09 11:23',
                    end: '2018/11/09 15:45',
                    value: '755529799',
                    orderId: 0,
                    materialId: 0,
                    delay :false
                    // bg: 'yellow'
                },
                {
                    start: '2018/11/09 19:55',
                    end: '2018/11/10 0:00',
                    value: '755529799',
                    orderId: 0,
                    materialId: 0,
                    delay :false
                    // bg: 'blue'
                },
                {
                    start: '2018/11/10 0:28',
                    end: '2018/11/10 4:30',
                    value: '125678912',
                    orderId: 0,
                    materialId: 0,
                    delay :true
                    // bg: 'green'
                },
            ]
        },
    ],
    code: 200,
    msg: "ok"
};

module.exports = {
    resourceGanttHour: [API.RESOURCE_GANTT_HOUR, "get", resourceGanttVO],
    resourceGanttDate: [API.RESOURCE_GANTT_DAY, "get", resourceGanttVO],
};
