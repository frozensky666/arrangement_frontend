import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("@/views/pc/home/Home");
const M_Home = () => import("@/views/mobile/home/M_Home");

const Error = () => import("@/views/pc/error/Error");
const Login = () => import("@/views/pc/login/Login");
const ResourceGantt_v2 = () => import("@/views/pc/resourceGantt/ResourceGantt_v2");
const ResourceGantt = () => import("@/views/pc/resourceGantt/ResourceGantt");
const ResourceLoad = () => import("@/views/pc/resourceLoad/ResourceLoad");
const OrderGantt =()=>import("@/views/pc/orderGantt/OrderGantt");
const DeviceManage =()=>import("@/views/pc/deviceManage/DeviceManage");
const OrderManage =()=>import("@/views/pc/orderManage/OrderManage");
// const OutputOfTask =()=>import("@/views/pc/outputOfTask/OutputOfTask");
// const OutputOfTaskResource =()=>import("@/views/pc/outputOfTaskResource/OutputOfTaskResource");
const OutputOfWork =()=>import("@/views/pc/outputOfWork/OutputOfWork");
const PersonnelManage =()=>import("@/views/pc/personnelManage/PersonnelManage");
// const TimeManage =()=>import("@/views/pc/timeManage/TimeManage");
const OutputOfOrderPlan =()=>import("@/views/pc/outputOfOrderPlan/OutputOfOrderPlan");
const Plan = () => import("@/views/pc/plan/Plan");
const PlanOverview = () => import("@/views/pc/planOverview/PlanOverview");

Vue.use(VueRouter);

const routes = [
  {
    path: '/error',
    component: Error
  },
  {
    path: "/",
    redirect: "/pc"
  },
  {
    path: "/pc", // pc端首页
    redirect: "/pc/outputOfOrderPlan"
  },
  {
    path: "/pc/login",
    component: Login
  },
  {
    path: "/pc/plan",
    name: "Plan",
    component: Plan,
    meta: { requiresAuth: [0] }
  },
  {
    path: "/pc/planOverview",
    name: "PlanOverview",
    component: PlanOverview,
    meta: { requiresAuth: [0] }
  },
  {
    path: "/pc/resourceGantt",
    name: "TestGantt",
    component: ResourceGantt,
    meta:{ requiresAuth: [0,1,2] }
  },
  {
    path: "/pc/resourceGantt_v2",
    name: "TestGantt_v2",
    component: ResourceGantt_v2,
    meta:{ requiresAuth: [0,1,2] }
  },
  {
    path: "/pc/testResourceLoad",
    name: "TestResourceLoad",
    component: ResourceLoad,
    meta:{ requiresAuth: [0,1,2] }
  },
  {
    path: "/pc/testorderGantt",
    name: "OrderGantt",
    component: OrderGantt,
    meta:{ requiresAuth: [0,1,2] }
  },
  {
    path: "/pc/deviceManage",
    name: "DeviceManage",
    component: DeviceManage,
    meta: { requiresAuth: [0] }
  },
  {
    path: "/pc/orderManage",
    name: "OrderManage",
    component: OrderManage,
    meta: { requiresAuth: [0] }
  },
  {
    path: "/pc/outputOfWork/:id",
    name: "OutputOfWork",
    component: OutputOfWork,
    meta: { requiresAuth: [0,1,2] },
	props: true
  },
  {
    path: "/pc/personnelManage",
    name: "PersonnelManage",
    component: PersonnelManage,
    meta: { requiresAuth: [0] }
  },
  // {
  //   path: "/pc/timeManage",
  //   name: "TimeManage",
  //   component: TimeManage,
  //   meta: { requiresAuth: [0] }
  // },
  {
    path: "/pc/outputOfOrderPlan",
    name: "OutputOfOrderPlan",
    component: OutputOfOrderPlan,
    meta:{ requiresAuth: [0,1,2] },
  },
  {
    path: '/m', // 手机端首页
    name: "M_Home",
    component: M_Home
  },
  {
    path: '*',
    redirect: '/error'
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to,from,next) => {
  if(to.path!=='/pc/login') {
    if(sessionStorage.getItem("user") === null) {
      next('/pc/login');
    } else if (!to.meta.requiresAuth) {
      next();
    } else if(to.meta.requiresAuth.some(auth => auth.toString() === sessionStorage.getItem("auth"))) {
      next();
    } else {
      next("/error")
    }
  }
  else {
    next();
  }
});

export default router;
