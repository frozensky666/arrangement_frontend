import request from "@/network/request";
const API = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const resourceLoadDay = config => request._get(API.RESOURCE_LOAD_DAY, config);
export const resourceLoadWeek = config => request._get(API.RESOURCE_LOAD_WEEK, config);
