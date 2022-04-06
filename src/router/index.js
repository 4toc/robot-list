import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@/components/MainPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MainPage,
  },
];

const router = createRouter({
  history: createWebHistory('/robot-list/'),
  routes,
});

export default router;
