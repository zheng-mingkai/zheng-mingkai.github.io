import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory("/"), // 这里指定基本URL
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/index.vue"),
    },
    {
      path: "/game",
      name: "game",
      children: [
        {
          path: "/2048",
          name: "2048",
          component: () => import("@/views/game/2048/index.vue"),
        }
      ]
    },
    {
      path: "/study",
      name: "study",
      children: [
        {
          path: "/study/list",
          name: "study/list",
          component: () => import("@/views/study/recite_the_words/word-list.vue"),
        },
        {
          path: "/study/study",
          name: "study/study",
          component: () => import("@/views/study/recite_the_words/index.vue"),
        }
      ]
    }
  ],
});
export default router;
