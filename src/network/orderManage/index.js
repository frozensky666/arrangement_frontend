import request from "@/network/request";
const API = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const getOrders = config => request._get(API.ORDER_MANAGE, config);
export const updateOrder = config => request._post(API.ORDER_MANAGE, config);
export const deleteOrder = config => request._delete(API.ORDER_MANAGE, config);
export const createOrder = config => request._post(API.ORDER_MANAGE, config);

