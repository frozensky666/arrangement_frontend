import Vue from "vue";
import VueRouter from "vue-router";
import {_isMobile} from "@/common/utils";

const Error = () => import("@/components/content/Error");

// ----------------- PC --------------------------
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
const ProjectSwitch = () => import("@/views/pc/projectSwitch/ProjectSwitch");
const Analyze = () => import("@/views/pc/analyze/Analyze");

// ----------------- MOBILE --------------------------
const M_PlanOverview = () => import("@/views/mobile/planOverview/M_PlanOverview");
const M_ResourceLoad = () => import("@/views/mobile/resourceLoad/M_ResourceLoad");
const M_OrderGantt =()=>import("@/views/mobile/orderGantt/M_OrderGantt");
const M_ProjectSwitch = () => import("@/views/mobile/projectSwitch/M_ProjectSwitch");
const M_Login = () => import("@/views/mobile/login/M_Login");
const M_Analyze = () => import("@/views/mobile/analyze/M_Analyze");



Vue.use(VueRouter);

const routes = [
  {
    path: '/error',
    component: Error
  },
  {
    path: '/',
    redirect: _isMobile()?'/m':'/pc',
    meta: { requiresAuth: null }
  },

  // -----------------------PC----------------------------
  {
    path: "/pc", // pc端首页
    redirect: "/pc/outputOfOrderPlan",
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
    path: "/pc/projectSwitch",
    name: "ProjectSwitch",
    component: ProjectSwitch,
    meta: { requiresAuth: [0] }
  },
  {
    path: "/pc/analyze",
    name: "Analyze",
    component: Analyze,
    meta: { requiresAuth: [0,1,2] }
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

// -----------------------MOBILE-----------------------------
  {
    path: '/m', // 手机端首页
    redirect: "/m/planOverview",
  },
  {
    path: "/m/login",
    component: M_Login
  },
  {
    path: "/m/planOverview",
    name: "M_PlanOverview",
    component: M_PlanOverview,
    meta: { requiresAuth: [0] }
  },
  {
    path: "/m/projectSwitch",
    name: "M_ProjectSwitch",
    component: M_ProjectSwitch,
    meta: { requiresAuth: [0] }
  },
  {
    path: "/m/resourceLoad",
    name: "M_ResourceLoad",
    component: M_ResourceLoad,
    meta:{ requiresAuth: [0,1,2] }
  },
  {
    path: "/m/orderGantt",
    name: "M_OrderGantt",
    component: M_OrderGantt,
    meta:{ requiresAuth: [0,1,2] }
  },
  {
    path: "/m/analyze",
    name: "M_Analyze",
    component: M_Analyze,
    meta:{ requiresAuth: [0,1,2] }
  },


// -----------------------未找到页面-----------------------------
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
  if(to.path!=='/m/login' &&  to.path!=='/pc/login') { // 访问非login页面
    if(sessionStorage.getItem("user") === null) { //未登录，则跳转登录
      if(_isMobile()) {
        next('/m/login');
      } else {
        next('/pc/login');
      }
    } else { //若已经登录，查看用户权限
      if(to.meta.requiresAuth) {
        if(to.meta.requiresAuth.some(auth => auth.toString() === sessionStorage.getItem("auth"))) { //有权限
          next();
        } else {
          next("/error"); //无权限
        }
      }
      else { //页面没有权限限制，直接访问
        next();
      }
    }
  } else { //直接访问login页面
    next();
  }
  // next();
});

export default router;
