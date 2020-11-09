import request from "@/network/request";
const API = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const getsimulatetime = config => request._get(API.SIMULATE_TIME, config);
export const setsimulatetime = config => request._get(API.SIMULATE_TIME+"/:t", config);