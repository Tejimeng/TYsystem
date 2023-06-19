<template>
  <div class="container">
    <div class="infoshow">
      <!-- 用户的头像 -->
      <div class="user">
        <!-- <img src="user.avatar" alt="" class="avatar"> -->
        <img :src="avatarUrl" class="avatar" />
      </div>
      <!-- 用户的个人信息 -->
      <div class="userinfo">
        <div class="user-item">
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-029747aa=""
          >
            <path
            class="info"
              fill="currentColor"
              d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"
            ></path>
          </svg>
          <span class="info">{{ user.name }}</span>
        </div>
        <div class="user-item" v-for="(value, index) in list[0]" :key="index">
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-029747aa=""
          >
            <path
            class="info"
              fill="currentColor"
              d="M764.416 254.72a351.68 351.68 0 0 1 86.336 149.184H960v192.064H850.752a351.68 351.68 0 0 1-86.336 149.312l54.72 94.72-166.272 96-54.592-94.72a352.64 352.64 0 0 1-172.48 0L371.136 936l-166.272-96 54.72-94.72a351.68 351.68 0 0 1-86.336-149.312H64v-192h109.248a351.68 351.68 0 0 1 86.336-149.312L204.8 160l166.208-96h.192l54.656 94.592a352.64 352.64 0 0 1 172.48 0L652.8 64h.128L819.2 160l-54.72 94.72zM704 499.968a192 192 0 1 0-384 0 192 192 0 0 0 384 0z"
            ></path>
          </svg>
          <span class="info">{{ value }}</span>
        </div>
      </div>
      <!-- 修改个人信息的按钮 -->

      <dialog-vue
        :dialog="dialog"
        @update="getProfile_info"
        :formData="formData"
      ></dialog-vue>
    </div>
    <el-button
      class="editbutton"
      size="large"
      type="danger"
      @click="handleEdit()"
    >
      <el-icon><Edit /></el-icon>修改个人信息</el-button
    >
  </div>
</template>

<script setup>
import { Timer, Edit, Delete, Plus, Search } from "@element-plus/icons";
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import DialogVue from "../components/InfoDialog.vue";
const { proxy } = getCurrentInstance();
import { useStore } from "vuex";
import bus from "../bus.js";
// 引入深拷贝
const _ = require("lodash");
const store = useStore();
const user = computed(() => {
  return store.getters.user;
});
// 初始表单
let tableData = ref([]);
// 列举表单
let list = ref([]);
// 设置弹窗传递信息
let dialog = ref({ show: false, title: "", option: "edit" });
// 向子组件传递的表单
let formData = ref({
  avatar: "",
  name: "",
  age: "",
  addr: "",
  birth: "",
  sex: "",
  id: "",
});
// 因为获取个人信息的过程属于异步操作，不能直接响应到页面上，所以采用地址另存的方法
let avatarUrl = ref();
// 获取自己的数据
const getProfile_info = () => {
  proxy.$axios
    .get(`/userinfo/oneUser/${user.value.name}`)
    .then((res) => {
      // 对时间的格式进行处理
      res.data[0].birth = res.data[0].birth.slice(0, 10);
      tableData.value = res.data;
      // 将头像信息传递给其他的组件
      bus.emit("avatarUrl", tableData.value[0].avatar);
      avatarUrl.value = tableData.value[0].avatar;
      // 对显示的数组进行深拷贝操作，不显示重复的数据
      list.value = _.cloneDeep(tableData.value);
      delete list.value[0].id;
      delete list.value[0].name;
      delete list.value[0].avatar;
    })
    .catch((err) => {
      console.log(err);
    });
};
// 修改个人信息
const handleEdit = () => {
  dialog.value = {
    show: true,
    title: "修改个人信息",
    option: "edit",
  };
  formData.value = {
    avatar: tableData.value[0].avatar,
    name: tableData.value[0].name,
    age: tableData.value[0].age,
    birth: tableData.value[0].birth,
    addr: tableData.value[0].addr,
    sex: tableData.value[0].sex,
    id: tableData.value[0].id,
  };
};
onMounted(() => {
  getProfile_info();
});
</script>

<style lang="less" scoped>
.info{
  color: #fff;
}
.container {
  margin-left: 35px;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-size: 100% 100%;
  background-image: url(../assets/images/meixi1.jpg);
  padding-top: 100px;
  .infoshow {
    position: relative;
    
    display: flex;
    .user {
      width: 400px;
      position: relative;
      top: 30%;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 200px;
        border-radius: 50%;
      }
    }

    .userinfo {
      color: #fff !important;
      position: relative;
      flex: 1;
      height: 100%;
      background-color: rgba(238, 238, 238.7, alpha);
      span {
        text-align: center;
        font-size: 20px;
        font-weight: 700;
      }

      .user-item {
        position: relative;
        top: 30%;
        padding: 26px;
        font-size: 28px;
        color: #333;
        display: flex;
        align-items: center;

        .icon {
          width: 30px;
          height: 30px;
          margin-right: 20px;
        }
      }
    }
  }
  .editbutton {
    position: relative;
    margin-top: 50px;
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
