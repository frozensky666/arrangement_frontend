import request from "@/network/request";
const API = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const getswitch = config => request._get(API.SWITCH_GET, config);
export const setswitch = config => request._post( API.SWITCH_POST, config);


