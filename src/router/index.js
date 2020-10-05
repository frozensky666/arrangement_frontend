import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("@/views/pc/home/Home");
const M_Home = () => import("@/views/mobile/home/M_Home");

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
