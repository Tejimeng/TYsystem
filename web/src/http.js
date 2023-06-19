// 拦截模块
import axios from "axios";
// 动画加载模块
import { ElLoading, ElMessage } from 'element-plus'
import router from "./router";
let loading
const startLoading = () => {
    loading = ElLoading.service({
        lock: true,
        text: '拼命加载中·····',
        background: 'rgba(0,0,0,0.7)'
    })
}
const endLoading = () => {
    setTimeout(()=>{
        loading.close()
    },700)
}
// 请求拦截
axios.interceptors.request.use(
    config => {
        // 加载动画
        startLoading()
        // 在发送请求时判断是否含有有效的token
        if (localStorage.mytoken) {
            // 设置统一的请求header
            config.headers.Authorization = localStorage.mytoken
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// 响应拦截
axios.interceptors.response.use(
    response => {
        // 结束加载动画
        endLoading()
        return response
    }, error => {
        endLoading()
        ElMessage.error(error.response.data)

        // 获取错误状态码
        const { status } = error.response
        if (status == 401) {
            ElMessage.error("token失效，请重新登录")
            // 清除token
            localStorage.removeItem('mytoken')
            // 重新跳转登录页面
            router.push("/login")
        }
        return Promise.reject(error)
    })
// 向外暴露
export default axios