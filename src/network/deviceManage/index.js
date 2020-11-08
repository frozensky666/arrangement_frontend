import request from "@/network/request";
const API = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const getDevices = config => request._get(API.DEVICE_MANAGE, config);
export const updateDevice = config => request._post(API.DEVICE_MANAGE, config);
export const deleteDevice = config => request._delete(API.DEVICE_MANAGE, config);
export const createDevice = config => request._post(API.DEVICE_MANAGE, config);

