import Vue from "vue";
import VueRouter from "vue-router";
import ExampleStudyPlan from "../views/ExampleStudyPlan.vue";
import Login from "../views/Login.vue";
import StudyPlan from "../views/StudyPlan.vue";
import Help from "../views/Help.vue";
import Profile from "../views/Profile.vue";
import BaseModalChildCourse from "../components/BaseModalChildCourse.vue";
import BaseModalParentCourse from "../components/BaseModalParentCourse.vue";

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
        component: BaseModalParentCourse,
        name: "baseModalParentCourse",
      },
      {
        path: ":parentCode/:code/:semester",
        component: BaseModalChildCourse,
        name: "baseModalChildCourse",
      },
    ],
  },
  {
    path: "/example-studyplan",
    name: "ExampleStudyPlan",
    component: ExampleStudyPlan,
  },
  {
    path: "/hilfe",
    name: "Help",
    component: Help,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
