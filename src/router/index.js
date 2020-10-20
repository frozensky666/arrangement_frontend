import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("@/views/pc/home/Home");
const M_Home = () => import("@/views/mobile/home/M_Home");
const ResourceGantt = () => import("@/views/pc/resourceGantt/ResourceGantt_v2");
const ResourceLoad = () => import("@/views/pc/resourceLoad/ResourceLoad")
const OrderGantt =()=>import("@/views/pc/orderGantt/OrderGantt")
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/pc"
  },
  {
    path: "/pc", // pc端首页
    name: "Home",
    component: Home
  },
  {
    path: "/pc/testGantt",
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
