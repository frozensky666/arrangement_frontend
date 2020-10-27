import request from "@/network/request";
const API = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const resourceGanttHour = config => request._get(API.RESOURCE_GANTT_HOUR, config);
export const resourceGanttDate = config => request._get(API.RESOURCE_GANTT_DAY, config);
