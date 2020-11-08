import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("@/views/pc/home/Home");
const M_Home = () => import("@/views/mobile/home/M_Home");

const ResourceGantt = () => import("@/views/pc/resourceGantt/ResourceGantt_v2");
const ResourceLoad = () => import("@/views/pc/resourceLoad/ResourceLoad");
const OrderGantt =()=>import("@/views/pc/orderGantt/OrderGantt");
const DeviceManage =()=>import("@/views/pc/deviceManage/DeviceManage");
const OrderManage =()=>import("@/views/pc/orderManage/OrderManage");
const OutputOfTask =()=>import("@/views/pc/outputOfTask/OutputOfTask");
const OutputOfTaskResource =()=>import("@/views/pc/outputOfTaskResource/OutputOfTaskResource");
const OutputOfWork =()=>import("@/views/pc/outputOfWork/OutputOfWork");
const PersonnelManage =()=>import("@/views/pc/personnelManage/PersonnelManage");
const TimeManage =()=>import("@/views/pc/timeManage/TimeManage");
const OutputOfOrderPlan =()=>import("@/views/pc/outputOfOrderPlan/OutputOfOrderPlan");
const Plan = () => import("@/views/pc/plan/Plan");
const Login = () => import("@/views/pc/login/Login");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/pc"
  },
  {
    path: "/pc", // pc端首页
    redirect: "/pc/login"
  },
  {
    path: "/pc/login",
    component: Login
  },
  {
    path: "/pc/plan",
    name: "Plan",
    component: Plan
  },
  {
    path: "/pc/resourceGantt",
    name: "TestGantt",
    component: ResourceGantt
  },
  {
    path: "/pc/testResourceLoad",
    name: "TestResourceLoad",
    component: ResourceLoad
  },
  {
    path: "/pc/testorderGantt",
    name: "OrderGantt",
    component: OrderGantt,
  },
  {
    path: "/pc/deviceManage",
    name: "DeviceManage",
    component: DeviceManage,
  },
  {
    path: "/pc/orderManage",
    name: "OrderManage",
    component: OrderManage,
  },
  {
    path: "/pc/outputOfTask",
    name: "OutputOfTask",
    component: OutputOfTask,
  },
  {
    path: "/pc/outputOfTaskResource",
    name: "OutputOfTaskResource",
    component: OutputOfTaskResource,
  },
  {
    path: "/pc/outputOfWork/:id",
    name: "OutputOfWork",
    component: OutputOfWork,
	props: true
  },
  {
    path: "/pc/personnelManage",
    name: "PersonnelManage",
    component: PersonnelManage,
  },
  {
    path: "/pc/timeManage",
    name: "TimeManage",
    component: TimeManage,
  },
  {
    path: "/pc/outputOfOrderPlan",
    name: "OutputOfOrderPlan",
    component: OutputOfOrderPlan,
  },
  {
    path: '/m', // 手机端首页
    name: "M_Home",
    component: M_Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
