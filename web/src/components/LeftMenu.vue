<template>
  <div class="menu_container">
    <!-- 菜单 -->
    <div class="left">
      <!-- 菜单内容 -->
      <el-row class="tac menu">
        <el-col>
          <el-menu active-text-color="#af8f53" class="el-menu-vertical-demo">
            <router-link to="/home">
              <el-menu-item index="0">
                <span class="title">首页</span>
                <!-- 图标 -->
                <!-- <svg
                class="icon_a"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                data-v-029747aa=""
              >
                <path
                  fill="currentColor"
                  d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512z"
                ></path>
                <path
                  fill="currentColor"
                  d="M512 512a32 32 0 0 1 32 32v256a32 32 0 1 1-64 0V544a32 32 0 0 1 32-32z"
                ></path>
                <path
                  fill="currentColor"
                  d="M384 649.088v64.96C269.76 732.352 192 771.904 192 800c0 37.696 139.904 96 320 96s320-58.304 320-96c0-28.16-77.76-67.648-192-85.952v-64.96C789.12 671.04 896 730.368 896 800c0 88.32-171.904 160-384 160s-384-71.68-384-160c0-69.696 106.88-128.96 256-150.912z"
                ></path>
              </svg> -->
              </el-menu-item>
            </router-link>

            <template v-if="user.identify == '管理员'">
              <template v-for="item in mange">
                <el-sub-menu
                  v-if="item.children"
                  :index="item.path"
                  :key="item.path"
                >
                  <template #title>
                    <i :class="`iconfont  ${item.icon}`"></i>
                    <!-- eslint-disable-next-line -->
                    <span class="title" slot="title">{{ item.name }}</span>
                  </template>
                  <router-link
                    v-for="(citem, cindex) in item.children"
                    :to="citem.path"
                    :key="cindex"
                  >
                    <el-menu-item :index="citem.path">
                      <!-- eslint-disable-next-line -->
                      <span class="title" slot="title">{{ citem.name }}</span>
                    </el-menu-item>
                  </router-link>
                </el-sub-menu>
              </template>
            </template>

            <template v-if="user.identify == '用户'">
              <template v-for="item in items">
                <el-sub-menu
                  v-if="item.children"
                  :index="item.path"
                  :key="item.path"
                  
                >
                  <template #title>
                    <i :class="`iconfont  ${item.icon}`"></i>
                    <!-- eslint-disable-next-line -->
                    <span  class="title" slot="title">{{ item.name }}</span>
                  </template>
                  <router-link
                    v-for="(citem, cindex) in item.children"
                    :to="citem.path"
                    :key="cindex"
                  >
                    <el-menu-item :index="citem.path">
                      <!-- eslint-disable-next-line -->
                      <span  class="title" slot="title">{{ citem.name }}</span>
                    </el-menu-item>
                  </router-link>
                </el-sub-menu>
              </template>
            </template>
          </el-menu>
        </el-col>
      </el-row>
      <!-- 小箭头 -->
      <!-- <svg
        class="icon_button"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        data-v-029747aa=""
      >
        <path fill="currentColor" d="M384 192v640l384-320.064z"></path>
      </svg> -->
    </div>
  </div>
</template>

<script setup>
import { Timer, Edit, Delete, Plus, Search } from "@element-plus/icons";
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();
// 挂载了计算属性，必须引入this，否则不能使用
const { proxy } = getCurrentInstance();
const user = computed(() => {
  return store.getters.user;
});
// 管理员菜单
const mange = reactive([
  {
    icon: "icon-weibiaoti1",
    name: "用户",
    path: "users",
    children: [
      {
        path: "userlist",
        name: "用户管理",
      },
      {
        path: "userinfo",
        name: "信息管理",
      },
    ],
  },
  {
    icon: "icon-weibiaoti1",
    name: "场馆",
    path: "venues",
    children: [
      {
        path: "venuelist",
        name: "管理",
      },
    ],
  },
  {
    icon: "icon-weibiaoti1",
    name: "赛事",
    path: "coms",
    children: [
      {
        path: "comlist",
        name: "信息管理",
      },
    ],
  },
  {
    icon: "icon-weibiaoti1",
    name: "留言",
    path: "message",
    children: [
      {
        path: "message",
        name: "留言板管理",
      },
    ],
  },
  {
    icon: "icon-weibiaoti1",
    name: "门票管理",
    path: "TicketMan",
    children: [
      {
        name: "购票信息管理",
        path: "TicketMan",
      },
    ],
  },
]);
// 用户菜单
const items = reactive([
  {
    icon: "icon-weibiaoti1",
    name: "场馆",
    path: "venues",
    children: [
      {
        path: "venuelist",
        name: "场馆信息",
      },
    ],
  },
  {
    icon: "icon-weibiaoti1",
    name: "赛事",
    path: "coms",
    children: [
      {
        path: "comlist",
        name: "赛事信息",
      },
    ],
  },
  {
    icon: "icon-weibiaoti1",
    name: "留言",
    path: "message",
    children: [
      {
        path: "message",
        name: "留言板",
      },
    ],
  },
  {
    icon: "icon-weibiaoti1",
    name: "我的",
    path: "Ticket",
    children: [
      {
        name: "购票信息",
        path: "Ticket",
      },
    ],
  },
]);
</script>

<style lang="less" scoped>
.title{
  color: #FFD700;
}
.el-menu-item{
  background-color: rgba(0, 0, 0, .8);
  &:hover{
    background-color: rgba(204, 204, 204, 0.1);
  }
}
.menu_container {
  z-index: 99;
  .left {
    z-index: 999;
    position: relative;
    margin-left: -105px;
    transition: all 0.3s;
    background-color: #000;
    .icon_button {
      // margin-left: -140px;
      position: absolute;
      left: 10%;
      margin-top: 330px;
      width: 60px;
      transition: all 0.5s;
      &:hover {
        color: #ccc;
        margin-left: 140px;
      }
    }
    .menu {
      border-right: none;
      width: 140px;
      height: 100%;
      position: fixed;
      .icon_a {
        width: 30px;
      }
      .el-menu {
        height: 100%;
      }
      .el-menu-vertical-demo {
        // padding-top: 50px;
        // background: linear-gradient(
        //   rgba(20, 20, 20, 0.8),
        //   rgba(204, 204, 204, 0.3),
        //   rgba(80, 77, 77, 0.8)
        // );
        background-color: rgba(0, 0, 0, .8);
        // &:hover {
        //   background: linear-gradient(
        //     rgba(20, 20, 20, 1),
        //     rgba(204, 204, 204, 1),
        //     rgba(80, 77, 77, 1)
        //   );
        // }
      }
    }
    &:hover {
      // background: linear-gradient(
      //   rgba(20, 20, 20, 1),
      //   rgba(204, 204, 204, 1),
      //   rgba(80, 77, 77, 1)
      // );
      background-color: rgba(0, 0, 0, .5);
      margin-left: 0px;
    }
  }
}
</style>
