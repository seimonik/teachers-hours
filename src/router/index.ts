import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DocumentsView from "@/views/DocumentsView.vue";
import TeachersView from "@/views/TeachersView.vue";
import HoursCalculationView from "@/views/HoursCalculationView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    name: "employee",
    component: () => import("../views/MainView.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: HomeView,
      },
      {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
      },
      {
        path: "/documents",
        name: "documents",
        component: DocumentsView,
      },
      {
        path: "/teachers",
        name: "teachers",
        component: TeachersView,
      },
      {
        path: "/calculation",
        name: "calculation",
        component: HoursCalculationView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
