//TEST
const TEST_GET = "/api/test/get";
const TEST_POST = "/api/test/post";

//资源甘特图
const RESOURCE_GANTT_HOUR = "/resourceGantt/hour";
const RESOURCE_GANTT_DAY = "/resourceGantt/date";

//订单模块
const ORDER_MANAGE = "/order";

//人员模块
const PERSONNEL_MANAGE = "/person";
const PERSONNEL_MANAGE_ALL_GROUPS = "/person/group";
const LOGIN = "/login";

//设备模块
const DEVICE_MANAGE = "/device";

//模拟系统
const SIMULATE_TIME = "/time";
const FAST_MODE = "/fast";
const FAST_MODE_TOGGLE = "/fast/toggle";

//物料模块
const MATERIAL_ID = "/materrial/ID";

//排程模块
const PLAN = "/plan";
const PLAN_SUBORDER = "/plan/sub-order";
const PLAN_PROD = "/plan/production";

//资源负载图
const RESOURCE_LOAD_DAY = "/resourceLoad/day";
const RESOURCE_LOAD_WEEK = "/resourceLoad/week";

//订单甘特图
const ORDER_GANTT_LIST = "/order/gantt";
const ORDER_GANTT_RATE = "/order/rate";


module.exports = {
  TEST_GET,
  TEST_POST,

  RESOURCE_GANTT_DAY,
  RESOURCE_GANTT_HOUR,

  ORDER_MANAGE,

  PERSONNEL_MANAGE,
  PERSONNEL_MANAGE_ALL_GROUPS,
  LOGIN,

  DEVICE_MANAGE,

  SIMULATE_TIME,
  FAST_MODE,
  FAST_MODE_TOGGLE,

  MATERIAL_ID,

  PLAN,
  PLAN_PROD,
  PLAN_SUBORDER,

  RESOURCE_LOAD_DAY,
  RESOURCE_LOAD_WEEK,

  ORDER_GANTT_LIST,
  ORDER_GANTT_RATE
};
