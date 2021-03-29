import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Translations from "../views/Translations.vue";
import Settings from "@/views/Settings.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Translations,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
