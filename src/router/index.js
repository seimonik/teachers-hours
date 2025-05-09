import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DocumentsView from "@/views/DocumentsView.vue";
import TeachersView from "@/views/TeachersView.vue";
import HoursCalculationView from "@/views/HoursCalculationView.vue";
import AdministrationView from "@/views/AdministrationView.vue";
import store from "@/store";
import { login, logout } from "@/service/authorization";

const routes = [
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
      {
        path: "/calculation/:id",
        name: "calculation-generate",
        component: HoursCalculationView,
      },
      {
        path: "/administration",
        name: "administration",
        component: AdministrationView,
      },
      {
        path: "/:pathMatch(.*)*",
        name: "404",
        component: HomeView,
      },
    ],
  },
  {
    path: "/logout",
    name: "logout",
    meta: { title: "Выход" },
    beforeEnter() {
      logout();
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!store.getters.isAuthorized) {
    login(() => next("/documents"));
  } else {
    next();
  }
});

export default router;
