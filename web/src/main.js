import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "./http";
import store from "./store";
import "../src/assets/less/index.less";
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
// 进行原型链的挂载，便于全局使用
// 必须设置根路径，否则无法加载路由
axios.defaults.baseURL = 'http://127.0.0.1:5555/'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 进行一些全局使用组件的挂载
app.config.globalProperties.$axios = axios
app.config.globalProperties.$message = ElMessage;

//app.use(router) 需放在app.mount('#app')前面  不然加载时router-view、router-link等未被渲染
// app.use(ElementPlus)
app.use(store).use(router).use(ElementPlus).mount('#app')

