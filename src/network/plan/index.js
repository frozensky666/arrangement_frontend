import request from "@/network/request";
const API = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const plan = config => request._post(API.PLAN, config);
export const getsuborder = config => request._get(API.PLAN_SUBORDER, config);
export const getproduction = config => request._get(API.PLAN_PROD, config);