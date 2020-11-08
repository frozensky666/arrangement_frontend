import request from "@/network/request";
const API = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const getPeople = config => request._get(API.PERSONNEL_MANAGE, config);
export const updatePerson = config => request._post(API.PERSONNEL_MANAGE, config);
export const deletePerson = config => request._delete(API.PERSONNEL_MANAGE, config);
export const createPerson = config => request._post(API.PERSONNEL_MANAGE, config);
export const getAllGroups = config => request._get(API.PERSONNEL_MANAGE_ALL_GROUPS, config);
