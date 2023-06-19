<template>
  <div class="message">
    <!--按钮 -->
    <div class="opmenu">
      <!-- 添加 -->
      <div class="add">
        <el-form-item class="btnRight">
          <!-- 添加评论的按钮 -->
          <el-button
            class="addButton"
            type="primary"
            @click="handleAdd"
            v-if="user.identify == '用户'"
            ><el-icon><Plus />&nbsp; </el-icon>来一条想法</el-button
          >
        </el-form-item>
      </div>
      <!-- 按比赛名称查找 -->
      <div class="search">
        🙂🙂🙂🙂🙂请文明留言，不要说脏话哦~🙂🙂🙂🙂🙂
        <!-- <el-form-item class="search_input">
            <el-input
              placeholder="请输入赛事名称"
              prefix-icon="el-icon-search"
              v-model="searchinfo.search_name"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="serach_button">
            <el-button type="success" @click="handleSearch"
              ><el-icon><Search /></el-icon>筛选</el-button
            >
          </el-form-item> -->
      </div>
    </div>
    <!-- 卡片留言模块 -->
    <!-- <el-row class="card_container">
      <el-col
        :span="5"
        v-for="(value, index) in tableData"
        :key="index"
        :offset="1"
      >
        <el-card class="cards" :body-style="{ padding: '0px' }">
          <span class="comname">{{ value.comname }}</span>
          <div style="padding: 14px">
            <span class="username">{{ value.name }}</span>
            <div class="bottom clearfix">
              <p class="text">{{ value.message }}</p>
              <time class="time">{{ value.messagetime }}</time>
              <div class="opert">
                <el-button
                  size="small"
                  type="success"
                  @click="handleInfo(value.id)"
                >
                  <el-icon><Edit /></el-icon>详情</el-button
                >
                <el-button
                  v-if="user.name === value.name"
                  size="small"
                  type="warning"
                  @click="handleEdit(value.id)"
                >
                  <el-icon><Edit /></el-icon>编辑</el-button
                >
                <el-button
                  v-if="user.name === value.name || user.identify === '管理员'"
                  size="small"
                  type="danger"
                  @click="handleDelete(value.id)"
                >
                  <el-icon><Delete /></el-icon>删除</el-button
                >
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row> -->
    <!-- tab卡留言 -->
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane
        v-for="(value, index) in com_list"
        :key="index"
        :label="value"
        :name="value"
        class="titles"
      >
      </el-tab-pane>
      <!-- 评论相关的内容 -->
      <div class="message_container">
        <el-card class="el-card-d" shadow="always">
          <div class="infinite-list-wrapper" style="overflow: auto">
            <el-timeline infinite-scroll-disabled="disabled">
              <div v-if="messageInfo.length > 0">
                <el-timeline-item
                  class="meessage_bar"
                  v-for="(value, index) in messageInfo"
                  :key="index"
                  color="#409eff"
                  :timestamp="value.messagetime"
                  placement="top"
                >
                  <el-card class="el-card-m" style="height: 120px">
                    <h4 class="username">{{ value.name }}：</h4>
                    <p class="text">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ value.message }}
                    </p>
                  </el-card>
                  <!-- 操作按钮部分 -->
                  <div class="opert">
                    <!-- 查看详情 -->
                    <!-- <el-button
                      size="small"
                      type="success"
                      @click="handleInfo(value.id)"
                    >
                      <el-icon><Edit /></el-icon>详情</el-button
                    > -->
                    <!-- 编辑自己的评论 -->
                    <el-button
                      class="opertButton"
                      v-if="user.name === value.name"
                      size="small"
                      type="warning"
                      @click="handleEdit(value.id)"
                    >
                      <el-icon><Edit /></el-icon>编辑</el-button
                    >
                    <!-- 删除评论 -->
                    <el-button
                      v-if="
                        user.name === value.name || user.identify === '管理员'
                      "
                      class="opertButton"
                      size="small"
                      type="danger"
                      @click="handleDelete(value.id)"
                    >
                      <el-icon><Delete /></el-icon>删除</el-button
                    >
                  </div>
                </el-timeline-item>
              </div>
              <div v-else>
                <el-timeline-item placement="top">
                  <el-card class="el-card-m" style="height: 120px">
                    <h4>大黄子：</h4>
                    <p>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      这里还没有人说话呢,你来说点什么吧😁
                    </p>
                  </el-card>
                </el-timeline-item>
              </div>
            </el-timeline>
          </div>
        </el-card>
       <!-- <el-backtop :right="100" :bottom="100" /> -->
      </div>
      
    </el-tabs>


    <dialog-vue
      :dialog="dialog"
      @update="getProfile"
      :formData="formData"
    ></dialog-vue>
  </div>
  
</template>
<script setup>
import { Timer, Edit, Delete, Plus, Search } from "@element-plus/icons";
import {
  ref,
  onMounted,
  getCurrentInstance,
  computed,
  watch,
  defineEmits,
  reactive,
} from "vue";
import DialogVue from "../components/megDialog.vue";
import { useStore } from "vuex";
const store = useStore();
const emits = defineEmits(["sendMsg"]);
const { proxy } = getCurrentInstance();
// 获取用户身份信息，用于判断用户的权限
const user = computed(() => {
  return store.getters.user;
});
// tab卡相关
import { TabsPaneContext } from "element-plus";
// 存放赛事名称
const com_list = ref([]);
// 被选中的第一个tab卡信息
const activeName = ref();
// 存储赛事的留言信息
const messageInfo = ref([]);
// tab栏的点击函数
const handleClick = (TabsPaneContext, event) => {
  // 当前赛事的名称 TabsPaneContext.props.label
  getMessage(TabsPaneContext.props.label);
};
// 获取赛事信息的函数
const getMessage = (name) => {
  // 过滤留言
  //  messageInfo.value = tableData.value.filter((item) => {
  //   return item.comname == name;
  // });
  // 独立发送请求
  proxy.$axios
    .get(`/message/onemessage/${name}`)
    .then((res) => {
      messageInfo.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
// 获取所有的赛事名称用于tab标签栏
const getProfilecom = () => {
  proxy.$axios
    .get("/cominfo/allComs")
    .then((res) => {
      for (let index = 0; index < res.data.length; index++) {
        com_list.value.push(res.data[index].name);
      }
      activeName.value = com_list.value[0];
    })
    .catch((err) => {
      console.log(err);
    });
};
// 搜索按钮的信息
let searchinfo = ref({
  search_name: "",
});
// 信息存放体
let tableData = ref([]);
let tableData_fake = ref({});
// 设置弹窗信息
let dialog = ref({ show: false, title: "", option: "edit" });
// 向子组件传递的表单
let formData = ref({
  name: "",
  message: "",
  comname: "",
  messagetime: "",
  id: "",
});
// 获取数据库内部的所有留言信息
const getProfile = () => {
  proxy.$axios
    .get("/message/allmessage")
    .then((res) => {
      for (let index = 0; index < res.data.length; index++) {
        res.data[index].messagetime = res.data[index].messagetime.slice(0, 10);
      }
      tableData.value = res.data;
      // 初始赋值留言列表
      getMessage(activeName.value);
    })
    .catch((err) => {
      console.log(err);
    });
};
// 删除评论
const handleDelete = (id) => {
  proxy.$axios.post(`/message/delete/${id}`).then((res) => {
    proxy.$message("删除成功！");
    // 重新渲染页面
    tableData.value.splice(0.1);
    getProfile();
  });
};
// 添加评论
const handleAdd = () => {
  dialog.value = {
    show: true,
    title: "添加留言",
    option: "add",
  };

  formData.value = {
    // 留言为当前用户，所以传过去当前的用户名
    name: user.value.name,
    message: "",
    comname: "",
    messagetime: "",
    id: "",
  };
};
// 修改评论(只能修改评论的内容)
const handleEdit = (id) => {
  tableData_fake.value = tableData.value.filter((item) => {
    return item.id === id;
  });
  dialog.value = {
    show: true,
    title: "修改评论",
    option: "edit",
  };
  formData.value = {
    name: tableData_fake.value[0].name,
    message: tableData_fake.value[0].message,
    comname: tableData_fake.value[0].comname,
    messagetime: tableData_fake.value[0].messagetime,
    id: tableData_fake.value[0].id,
  };
};
// 用户查看详情
const handleInfo = (id) => {
  tableData_fake.value = tableData.value.filter((item) => {
    return item.id === id;
  });
  dialog.value = {
    show: true,
    title: "留言如下:",
    option: "look",
  };
  formData.value = {
    name: tableData_fake.value[0].name,
    message: tableData_fake.value[0].message,
    comname: tableData_fake.value[0].comname,
    messagetime: tableData_fake.value[0].messagetime,
    id: tableData_fake.value[0].id,
  };
};
// 搜索过滤的函数
const handleSearch = () => {
  // 进行信息筛选
  // 如果文本框的内容为空就不进行筛选，重新拉取留言信息
  if (!searchinfo.value.search_name) {
    proxy.$message({
      type: "warning",
      message: "请输入赛事进行筛选！",
    });
    getProfile();
    return;
  }
  tableData.value = tableData.value.filter((item) => {
    return item.comname === searchinfo.value.search_name;
  });
  if (tableData.value.length === 0) {
    proxy.$message({
      type: "warning",
      message: "暂无此赛事的信息！",
    });
    getProfile();
    return;
  }
};
// 采用watch来进行首次留言显示
watch(
  () => activeName.value,
  () => {
    getMessage(activeName.value);
  }
);
onMounted(() => {
  getProfile();
  getProfilecom();
});
</script>
<style>
.el-tabs__item:hover{
  color: white;
}
.el-tabs__item{
  color: #ccc;
}
.is-active{
color: white !important;

}
.message {
  z-index: 999;
  height: 100vh;
  background-image: url(../assets/images/a.gif);
  background-size: 100% 100%;
  margin-left: 35px !important;
  padding: 16px;
  box-sizing: border-box;
}
.opmenu {
  z-index: 9;
  background: linear-gradient(
    to right,
    rgba(242, 242, 247, 0.6),
    rgba(182, 177, 177, 0.6)
  );
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.opmenu .add .btnRight {
  padding-top: 20px;
  margin-left: 50px;
}
.addButton {
  height: 50px;
  z-index: 999;
  position: fixed;
  font-size: 20px;
  bottom: 20px;
  right: 20px;
}
.opmenu .search {
  width: 100%;
  padding-top: 20px;
  height: 50px;
  /* display: flex;
  justify-content: space-around;
  align-items: center; */
}
.add {
  position: relative;
}
.add_container {
  position: absolute;
  left: 200px;
}

/* .card_container {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
}
.cards {
  z-index: 99;
  margin-top: 5px;
  margin-right: 10px;
  width: 300px;
  transition: all 0.3s;
  background-color: rgba(255, 255, 255, 0.8);
}
.cards .image {
  width: 250px;
  height: 145px;
  margin: 10px auto 0;
}
.cards .comname {
  display: block;
  margin-top: 5px;
  font-size: 20px;
}
.cards .username {
  display: block;
  text-align: left;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.6);
}
.cards .time {
  display: block;
  text-align: right;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
}
.cards .text {
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: linear-gradient(to right, red, blue, rgb(84, 78, 78));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
} */

.message_container {
  margin-top: 10px;
  /* background-color: red; */
  width: 100%;
}

.meessage_bar {
  text-align: left;
  position: relative;
}
.opert {
  /* background-color: aqua; */
  display: flex;
  height: 80%;
  justify-content: space-around;
  flex-direction: column;
  position: absolute;
  top: 20%;
  right: 1%;
}

.opertButton:hover {
  transform: scale(1.3);
}
.username {
  background: linear-gradient(to right, red, blue, rgb(84, 78, 78));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  height: 15px;
  line-height: 15px;
}
.text {
  margin-top: 10px;
  background: linear-gradient(to right, blue, red, rgb(84, 78, 78));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  height: 15px;
  line-height: 15px;
}
.cards .opert {
  margin-top: 5px;
}
.cards:hover {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 1);
}
.message {
  margin-left: 200px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.demo-tabs > .el-tabs__content {
  margin-top: -50px;
  width: 100%;
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

/* 留言样式 */
.infinite-list-wrapper {
  width: 100%;
  height: 500px;
}
.submit-message {
  width: 100%;
  background: rgb(235, 245, 247);
  color: cadetblue;
  letter-spacing: 20px;
}
.el-card{
  background-color: #fff;
}
@media screen and (max-width: 3000px) and (min-width: 767px) {
  .el-card-d {
    float: left;
    margin-top: 20px;
    margin-left: 10%;
    width: 80%;
    height: 90%;
    background-color: rgba(204, 204, 204, .3);
  }
}
/*
  屏幕小于768px的
  */
@media screen and (max-width: 768px) and (min-width: 100px) {
  .el-card-d {
    width: 100%;
    height: 100%;
  }
}
</style>