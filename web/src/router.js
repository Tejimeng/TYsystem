// 使用vue3
import { createRouter, createWebHistory } from 'vue-router'
// import MainVue from '@/views/Main.vue'

// 使用vue2
// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)
const routes =[
        {
            path:'/',
            redirect:"/index"
        },
        {
            path:'/index',
            name:'index',
            component:()=>import('./views/IndexAb'),
            children:[
              {
                path: "",
                component: () =>import('./views/home')
              },
              {
                path:'/home',
                component:()=>import('./views/home')
              },
              {
                path: "/infoshow",
                name: "infoshow",
                component: () => import("./views/InfoShow")
              },
              {
                path: "/venuelist",
                name: "venuelist",
                component: () => import("./views/VenueList")
              },
              {
                path: "/comlist",
                name: "comlist",
                component: () => import("./views/ComList")
              },
              {
                path: "/userlist",
                name: "userlist",
                component: () => import("./views/UserList")
              },
              {
                path: "/userinfo",
                name: "userinfo",
                component: () => import("./views/UserInfo")
              },
              {
                path: "/message",
                name: "message",
                component: () => import("./views/message")
              },
              {
                path:"/TicketMan",
                name:"TicketMan",
                component:()=>import("./views/TicketMan")
              },
              {
                path:"/Ticket",
                name:"Ticket",
                component:()=>import("./views/Ticket")
              }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import("./views/login/Login.vue")
        },
        {
            path: '/register',
            name: 'register',
            component: () => import("./views/register/Register.vue")
        },
        {
            path: '/:pathMatch(.*)',
            name: '404',
            component: () => import("./views/NotFound.vue")
        }
    ]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
  // 路由守卫
  router.beforeEach((to, from, next) => {
    // 判断本地储存的token是否过期
    const isLogin = localStorage.mytoken ? true : false
  
    if (to.path == "/login" || to.path == '/register') {
      next()
    } else {
      isLogin ? next() : next("/login")
    }
  })

export default router
// ({
//     mode:'history',
//     base:process.env.BASE_URL,
    
// })