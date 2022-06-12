import { createRouter, createWebHistory } from "vue-router";
import dashboard from "@/views/dashboard.vue";
import maps from "@/views/dashboard/maps.vue";
import login from "@/views/login.vue";
import users from "@/views/users.vue";
import settings from "@/views/settings.vue";
import viruses from "@/views/viruses.vue";
import modify from "@/views/users/modify.vue";
import fullinfos from "@/views/users/fullinfos.vue";
import Delete from "@/views/users/delete.vue";
import ajouter from "@/views/virus/ajouter.vue";
import modifier from "@/views/virus/modifier.vue";
import infos from "@/views/virus/infos.vue";
import settingsLanding from "@/views/settings/settingsLanding.vue";
import profil from "@/views/settings/profil.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    meta: { requireAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: { requireAuth: false },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    meta: { requireAuth: true },
    children: [
      {
        path: "/dashboard/maps/",
        name: "maps",
        component: maps,
      },
    ]
  },
  {
    path: "/users",
    name: "users",
    component: users,
    meta: { requireAuth: true },
    children: [
      {
        path: "/users/m",
        name: "modify blank",
        redirect: "/users",
      },
      {
        path: "/users/m/:uid",
        name: "modify",
        component: modify,
      },
      {
        path: "/users/v",
        name: "fullinfos blank",
        redirect: "/users",
      },
      {
        path: "/users/v/:uid",
        name: "fullinfos",
        component: fullinfos,
      },
      {
        path: "/users/d/",
        name: "delete blank",
        redirect: "/users",
      },
      {
        path: "/users/d/:uid",
        name: "delete",
        component: Delete,
      },
    ],
  },
  {
    path: "/settings",
    name: "settings",
    component: settings,

    meta: { requireAuth: true },
    children: [
      {
        path: "/settings",
        name: "landing",
        component: settingsLanding,
      },
      {
        path: "/settings/profil",
        name: "profil",
        component: profil,
      },
    ],
  },
  {
    path: "/viruses",
    name: "viruses",
    component: viruses,
    meta: { requireAuth: true },
    children: [
      {
        path: "/viruses/add",
        name: "ajouter",
        component: ajouter,
      },
      {
        path: "/viruses/modify/:uid",
        name: "modifier",
        component: modifier,
      },
      {
        path: "/viruses/modify",
        name: "modifier blank",
        redirect: "/viruses",
      },
      {
        path: "/viruses/info/:uid",
        name: "infos",
        component: infos,
      },
      {
        path: "/viruses/info",
        name: "infos blank",
        redirect: "/viruses",
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem("auth-token") == null) {
      return next({ path: "/login" });
    }
  } else {
    if (localStorage.getItem("auth-token") != null) {
      return next({ path: "/" });
    }
  }
  return next();
});

export default router;
