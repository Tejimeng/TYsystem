<template>
  <header class="head-nav">
    <div class="l-content">
      <img src="../assets/images/logo.webp" alt="" class="logo" />
      <span class="title">体育场馆在线售票信息管理系统</span>
    </div>
    <div class="m-content">
      <div class="clock_box">
        <div class="clock">
          <p>{{ time }}</p>
        </div>
      </div>
    </div>
    <div class="r-content">
      <div class="userinfo">
        <img :src="avatarUrl" alt="" class="avatar" />
        <div class="welcome">
          <p class="name comename">欢迎</p>
          <p class="name avatarname">{{ user.name }}</p>
        </div>
        <span class="username">
          <!-- 下拉箭头 -->
          <el-dropdown trigger="click" @command="setDialogInfo">
            <span class="el-dropdown-link">
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="info">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </div>
    </div>
  </header>
</template>
<script setup>
import { ArrowDown } from "@element-plus/icons";
import { ref, computed, onMounted, reactive,getCurrentInstance } from "vue";
import { useStore } from "vuex";
const { proxy } = getCurrentInstance();
import { useRouter } from "vue-router";
import bus from "../bus";
const router = useRouter();
const store = useStore();
const user = computed(() => {
  return store.getters.user;
});

let avatarUrl = ref();
// 单独的获取头像信息
const getProfile_info = () => {
  proxy.$axios
    .get(`/userinfo/oneUser/${user.value.name}`)
    .then((res) => {
      // 对时间的格式进行处理
      avatarUrl.value = res.data[0].avatar;
      // console.log( res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
// 接受组件传递的头像数据
  bus.on("avatarUrl", (e) => {
    avatarUrl.value = e;
  });
// 路由的跳转
const setDialogInfo = (cmdItem) => {
  switch (cmdItem) {
    case "info":
      showInfoList();
      break;
    case "logout":
      logout();
      break;
  }
};

const showInfoList = () => {
  router.push("/infoshow");
};

const logout = () => {
  // 清除token
  localStorage.removeItem("mytoken");
  // 设置vuex store
  store.dispatch("clearCurrentState");
  //   跳转
  router.push("/login");
};
const time = ref("");
// 定义函数传入time元素
function up() {
  let time;
  // 获取当前时间
  let date = new Date();
  // 获取时分秒
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  // 上午与下午
  let day_night = "AM";
  // 计算上午与下午
  if (h > 12) {
    h = h - 12;
    day_night = "PM";
  }
  // 如果时间小于10则前面补充0
  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  // 拼接时间并且赋值给time元素的文本中，从而显示
  time = h + ":" + m + ":" + s + " " + day_night;
  return time;
}
// 获取页面id=time的元素（P元素<p id="time">12:12:12 AM</p>）
// 定时器，每秒执行一次实现更新


// 在挂载前进行相应数据的获取
onMounted(() => {
  setInterval(() => {
    time.value = up();
  }, 1000);
  getProfile_info()
});
</script>
<style lang="less" scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  // background: linear-gradient(
  //   to right,
  //   #c8d5e2,
  //   #409eff,
  //   #18222c
  // );
  background-color:rgba(0, 0, 0, .8);
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
  position: relative;

  .m-content {
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    font-family: "Montserrat", sans-serif, Arial, "Microsoft Yahei";
    :root {
      --color2: #56d5fc;
      --color4: #def700;
      --color6: #ee087b;
    }
    .clock_box {
      position: relative;
      width: 300px;
      height: 60px;
      border-radius: 10px;
      background-image: linear-gradient(
        135deg,
        var(--color2),
        var(--color4),
        var(--color6)
      );
      /* 居中 */
      display: flex;
      justify-content: center;
      align-items: center;
      animation: animate 2s linear infinite;
      .clock {
        position: absolute;
        left: 10px;
        right: 10px;
        top: 10px;
        bottom: 10px;
        // background-color: rgb(231, 219, 219);
        border-radius: 8px;
        /* 居中 */
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          font-size: 25px;
          font-weight: bold;
          color: transparent;
          letter-spacing: 2px;
          background: linear-gradient(
            to right,
            rgb(220, 104, 104),
            blue,
            rgb(22, 20, 20)
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          // color: #fff ;
          // background-image: linear-gradient(
          //   135deg,
          //   var(--color2),
          //   var(--color4),
          //   var(--color6)
          // );
          // /* text不是通用样式属性值 */
          // background-clip: text;
          // -webkit-background-clip: text;
        }
      }
    }
    .clock_box::after,
    .clock_box::before {
      position: absolute;
      content: "";
      /* 集成父级样式 */
      background-image: inherit;
      width: 100%;
      height: 100%;
      z-index: -1;
      border-radius: 10px;
      filter: blur(15px);
    }

    .clock_box::before {
      filter: blur(100px);
    }

    @keyframes animate {
      100% {
        /* 色相变化 */
        filter: hue-rotate(360deg);
      }
    }
  }
  .l-content {
    float: left;
    display: flex;
    align-items: center;
    .logo {
      width: 50px;
      height: 50px;
      vertical-align: top;
    }
    .title {
      padding-left: 8px;
      font-size: 22px;
      font-weight: 600;
      color: #fff;
      font-family: "楷体";
    }
  }

  .r-content {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(20%, -45%);
    margin-right: 50px;
    .userinfo {
      margin-top: -5px;
      display: flex;
      align-items: center;
      height: 60px;
      .avatar {
        width: 40px;
        height: 40px;
      }

      .welcome {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 10px;
        .name {
          font-weight: 500;
          font-size: 14px;
          margin-right: 10px;
        }

        .avatarname {
          color: skyblue;
          padding-top: 5px;
        }
      }

      .username {
        .el-dropdown {
          color: #fff;
        }
      }
    }
  }
}
</style>