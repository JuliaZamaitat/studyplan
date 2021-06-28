import Vue from "vue";
import VueRouter from "vue-router";
import ExampleStudyPlan from "../views/ExampleStudyPlan.vue";
import Login from "../views/Login.vue";
import StudyPlan from "../views/StudyPlan.vue";
import BaseModal from "../components/BaseModal.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/my-studyplan",
    name: "StudyPlan",
    component: StudyPlan,
    children: [
      {
        path: ":code/:semester",
        component: BaseModal,
        name: "baseModal",
      },
    ],
  },
  {
    path: "/example-studyplan",
    name: "ExampleStudyPlan",
    component: ExampleStudyPlan,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
