import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Projects from "../views/Projects.vue";
import Feed from "../views/Feed.vue";
import Board from "../views/Board.vue";
import About from "../views/About.vue";
import Pricing from "../views/Pricing.vue";
import Careers from "../views/Careers.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/projects",
    name: "ProjectsList",
    component: Projects,
  },
  {
    path: "/projects/:project",
    name: "ProjectDashboard",
    component: Feed,
  },
  {
    path: "/projects/:project/feed",
    name: "ProjectFeed",
    component: Feed,
  },
  {
    path: "/projects/:project/feed/:issue",
    name: "ProjectFeedCard",
    component: Feed,
  },
  {
    path: "/projects/:project/board",
    name: "ProjectBoard",
    component: Board,
  },
  {
    path: "/projects/:project/board/:issue",
    name: "ProjectBoardCard",
    component: Board,
  },
  {
    path: "/about",
    name: "AboutUs",
    component: About,
  },
  {
    path: "/pricing",
    name: "Pricing",
    component: Pricing,
  },
  {
    path: "/careers",
    name: "Careers",
    component: Careers,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
