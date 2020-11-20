import request from "@/network/request";
const API = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const getorderList = config => request._get(API.ORDER_GANTT_LIST, config);
export const getorderRateFinish = config => request._get(API.ORDER_GANTT_RATE_FINISH, config);
