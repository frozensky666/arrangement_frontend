import request from "@/network/request";
const API = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const getAllMaterial = config => request._get(API.MATERIAL_ID, config);

