import { createApp } from "vue";
import App from "./App.vue";
import axios from 'axios'
import router from './router'
import UserManage_Api from '@/api/UserManage/index'

import mkAlert from './plugins/mkAlert';

const app = createApp(App);

// 引入 ElementPlus 插件(npm i element-plus)
import ElementPlusPlugin from "@/plugins/element-plus";

// 全局注册 ElementPlus 图标组件(npm install @element-plus/icons-vue)
import * as ElementPlusIcons from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIcons)) {
  app.component(key, component);
}

app.config.globalProperties.$customAlert = mkAlert;
app.config.globalProperties.$http = {
  ...UserManage_Api,
}
app.config.globalProperties.$axios = axios

app
  .use(router)
  .use(ElementPlusPlugin)
  .mount("#app");
