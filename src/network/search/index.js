import request from "@/network/request";
const API = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const comsearch = config => request._post(API.COM_SEARCH, config);
