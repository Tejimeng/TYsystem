<template>
  <div class="comlist">
    <!-- 添加按钮 -->
    <div>
      <el-form ref="add_data" :model="search_data">
        <!-- 筛选 -->
        <div class="search">
          <el-form-item>
            <el-date-picker
              v-model="search_data.startTime"
              type="datetime"
              placeholder="选择开始时间"
            />
            --
            <el-date-picker
              v-model="search_data.endTime"
              type="datetime"
              placeholder="选择结束时间"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="handleSearch"
              ><el-icon><Search /></el-icon>筛选</el-button
            >
          </el-form-item>
          <!-- 按照赛事的名称查找 -->
          <el-form-item class="search_input">
            <el-input
              placeholder="请输入赛事名称"
              prefix-icon="el-icon-search"
              v-model="search_data.search_name"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="serach_button">
            <el-button type="success" @click="handleSearch_name"
              ><el-icon><Search /></el-icon>查找</el-button
            >
          </el-form-item>
        </div>
        <el-form-item class="btnRight">
          <el-button
            type="primary"
            size="small"
            @click="handleAdd"
            v-if="user.identify == '管理员'"
            ><el-icon><Plus /></el-icon>添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- table部分 -->
    <div class="table_container" v-if="user.identify == '管理员'">
      <el-table
        ref="table"
        :data="tableData"
        style="width: 100%"
        max-height="550"
        :default-sort="{ prop: 'comTime', order: 'descending' }"
        stripe
      >
        <el-table-column
          v-if="user.identify == '管理员'"
          label="序号"
          align="center"
          width="50"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          label="赛事"
          align="center"
          width="120"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="赛事类型"
          width="120"
          align="center"
          prop="comType"
        ></el-table-column>
        <el-table-column
          label="组织者"
          width="120"
          align="center"
          prop="organizer"
          v-if="user.identify == '管理员'"
        ></el-table-column>
        <el-table-column
          label="参与者"
          width="250"
          align="center"
          prop="participant"
        ></el-table-column>
        <el-table-column
          label="赛事时间"
          width="255"
          align="center"
          prop="comTime"
          sortable
        >
          <template #default="scope">
            <div>
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.comTime }}</span>
            </div>
          </template></el-table-column
        >
        <el-table-column
          label="赛事地点"
          width="150"
          align="center"
          prop="comLocation"
        ></el-table-column>
        <el-table-column
          label="赛事结果"
          width="100"
          align="center"
          prop="comResult"
          v-if="user.identify == '管理员'"
        ></el-table-column>

        <el-table-column
          label="vip票价(￥)"
          width="150"
          align="center"
          prop="vipPrice"
        ></el-table-column>
        <el-table-column
          label="标准票价(￥)"
          width="150"
          align="center"
          prop="standardPrice"
        ></el-table-column>
        <el-table-column
          label="低价票价(￥)"
          width="150"
          align="center"
          prop="lowPrice"
        ></el-table-column>

        <el-table-column
          label="开始时间"
          width="150"
          align="center"
          prop="psTime"
        ></el-table-column>
        <el-table-column
          label="结束时间"
          width="150"
          align="center"
          prop="peTime"
          v-if="user.identify == '管理员'"
        ></el-table-column>

        <el-table-column
          label="操作"
          prop="operation"
          width="160"
          align="center"
          fixed="right"
          v-if="user.identify == '用户'"
        >
          <template #default="scope"
            ><el-button
              size="small"
              type="success"
              @click="handleInfo(scope.$index, scope.row)"
            >
              <el-icon><Edit /></el-icon>详情</el-button
            >
          </template>
        </el-table-column>

        <!-- 操作部分 -->
        <el-table-column
          label="操作"
          prop="operation"
          width="160"
          align="center"
          fixed="right"
          v-if="user.identify == '管理员'"
        >
          <template #default="scope">
            <el-button
              size="small"
              type="warning"
              @click="handleEdit(scope.$index, scope.row)"
            >
              <el-icon><Edit /></el-icon>编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              <el-icon><Delete /></el-icon>删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24"
          ><div class="pagination">
            <el-pagination
              v-model:current-page="paginations.page_index"
              :page-size="paginations.page_size"
              :page-sizes="paginations.page_sizes"
              :layout="paginations.layout"
              :total="paginations.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            /></div
        ></el-col>
      </el-row>
    </div>
    <!-- card部分 -->
    <el-row class="card_container" v-if="user.identify == '用户'">
      <el-col
        :span="5"
        v-for="(value, index) in tableData"
        :key="index"
        :offset="1"
      >
        <el-card class="cards" :body-style="{ padding: '0px' }">
          <span class="username">{{ value.name }}</span>

          <img
            :src="value.placard"
            class="image"
          />
          <img
            :src="value.placard"
            class="image"
          />
          <div style="padding: 14px" class="info">
            <span class="comname">时间：{{ value.comTime }}</span>
            <div class="bottom clearfix">
              <p class="text">地点：{{ value.comLocation }}</p>
              <div class="opert">
                <!-- 详情信息按钮 -->
                <el-button
                  size="small"
                  type="success"
                  @click="handleInfo_user(value.id)"
                >
                  <el-icon><Edit /></el-icon>详细信息</el-button
                >
                <!-- 购票按钮 -->
                <el-button
                  v-show="getNowFormatDate(value.comTime)"
                  size="small"
                  type="success"
                  @click="ticketInfo_user(value.id)"
                >
                  <el-icon><Edit /></el-icon>观看赛事</el-button
                >
                <!-- 过期按钮 -->
                <el-button
                  v-show="!getNowFormatDate(value.comTime)"
                  size="small"
                  type="info"
                >
                  <el-icon><Delete /></el-icon>已过期</el-button
                >
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 第一个弹窗 -->
    <dialog-vue
      :dialog="dialog"
      @update="getProfile"
      :formData="formData"
    ></dialog-vue>
    <!-- 第二个弹窗 -->
    <ticket-dialog
      :ticketDialog="ticketDialog"
      :ticketData="ticketData"
    ></ticket-dialog>
  </div>
</template>
<script setup>
import { Timer, Edit, Delete, Plus, Search } from "@element-plus/icons";
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import DialogVue from "../components/ComDialog.vue";
import TicketDialog from "../components/ticketDialog.vue";
import { useStore } from "vuex";
const store = useStore();
const { proxy } = getCurrentInstance();
// 获取用户身份信息，用于判断用户的权限
const user = computed(() => {
  return store.getters.user;
});
const search_data = ref({
  search_name: "",
  startTime: "",
  endTime: " ",
});
// 初始表单
let tableData = ref([]);
let tableData_fake = ref({});
// 过滤后的表单
let filterTableData = ref([]);
// 所有的表单数据
let allTableData = ref([]);
// 分页信息
const paginations = ref({
  page_index: 1, // 当前位于那页
  total: 0, // 总数
  page_size: 5, // 一页显示多少条
  page_sizes: [5, 10, 15, 20], // 每页显示多少条
  layout: "total, sizes, prev, pager, next, jumper", // 翻页属性
});
// 设置弹窗传递信息
let dialog = ref({ show: false, title: "", option: "edit" });
let ticketDialog = ref({ show: false, title: "" });
// 向子组件传递的表单
let formData = ref({
  placard:"",
  name: "",
  comType: "",
  organizer: "",
  participant: "",
  comTime: "",
  comLocation: "",
  comResult: "",
  vipPrice: "",
  standardPrice: "",
  lowPrice: "",
  psTime: "",
  peTime: "",
  id: "",
});
// 购票信息的表单
let ticketData = ref({
  id: "",
  username: "",
  venue: "",
  comInfo: "",
  comTime: "",
  vipPrice: "",
  standardPrice: "",
  lowPrice: "",
});
//确定按钮的使用权限
const getNowFormatDate = (row) => {
  return new Date() < new Date(row);
};
// 获取表格数据
const getProfile = () => {
  proxy.$axios
    .get("/cominfo/allComs")
    .then((res) => {
      // 对时间的格式进行处理
      for (let index = 0; index < res.data.length; index++) {
        res.data[index].comTime = res.data[index].comTime.slice(0, 10);
      }
      allTableData.value = res.data;
      filterTableData.value = res.data;
      // 设置分页数据
      setPaginations();
    })
    .catch((err) => {
      console.log(err);
    });
};
const setPaginations = () => {
  // 分页属性设置
  paginations.value.total = allTableData.value.length;
  paginations.value.page_index = 1;
  paginations.value.page_size = 5;
  // 设置默认的分页数据
  tableData.value = allTableData.value.filter((item, index) => {
    return index < paginations.value.page_size;
  });
};
const handleEdit = (index, row) => {
  //   编辑
  dialog.value = {
    show: true,
    title: "修改赛事信息",
    option: "edit",
  };

  formData.value = {
    placard:row.placard,
    name: row.name,
    comType: row.comType,
    organizer: row.organizer,
    participant: row.participant,
    comTime: row.comTime,
    comLocation: row.comLocation,
    comResult: row.comResult,
    vipPrice: row.vipPrice,
    standardPrice: row.standardPrice,
    lowPrice: row.lowPrice,
    psTime: row.psTime,
    peTime: row.peTime,
    id: row.id,
  };
};
// 懒加载问题
const handleDelete = (index, row) => {
  proxy.$axios.post(`/cominfo/delete/${row.id}`).then((res) => {
    proxy.$message("删除成功！");
    tableData.value.splice(0.1);
    getProfile();
  });
};
const handleAdd = () => {
  // 添加
  dialog.value = {
    show: true,
    title: "添加赛事信息",
    option: "add",
  };

  formData.value = {
    placard:"",
    name: "",
    comType: "",
    organizer: "",
    participant: "",
    comTime: "",
    comLocation: "",
    comResult: "",
    vipPrice: "",
    standardPrice: "",
    lowPrice: "",
    psTime: "",
    peTime: "",
    id: "",
  };
};
// 管理员查看详情的按钮
const handleInfo = (index, row) => {
  dialog.value = {
    show: true,
    title: "该赛事信息如下:",
    option: "look",
  };
  formData.value = {
    placard:rwo.placard,
    name: row.name,
    comType: row.comType,
    organizer: row.organizer,
    participant: row.participant,
    comTime: row.comTime,
    comLocation: row.comLocation,
    comResult: row.comResult,
    vipPrice: row.vipPrice,
    standardPrice: row.standardPrice,
    lowPrice: row.lowPrice,
    psTime: row.psTime,
    peTime: row.peTime,
    id: row.id,
  };
};
// 用户查看详情
const handleInfo_user = (id) => {
  tableData_fake.value = tableData.value.filter((item) => {
    return item.id === id;
  });
  dialog.value = {
    show: true,
    title: "该场馆信息如下:",
    option: "look",
  };
  formData.value = {
    placard:tableData_fake.value[0].placard,
    name: tableData_fake.value[0].name,
    comType: tableData_fake.value[0].comType,
    organizer: tableData_fake.value[0].organizer,
    participant: tableData_fake.value[0].participant,
    comTime: tableData_fake.value[0].comTime,
    comLocation: tableData_fake.value[0].comLocation,
    comResult: tableData_fake.value[0].comResult,
    vipPrice: tableData_fake.value[0].vipPrice,
    standardPrice: tableData_fake.value[0].standardPrice,
    lowPrice: tableData_fake.value[0].lowPrice,
    psTime: tableData_fake.value[0].psTime,
    peTime: tableData_fake.value[0].peTime,
    id: tableData_fake.value[0].id,
  };
};

// 用户进行购票
const ticketInfo_user = (id) => {
  // 获取购票赛事的信息
  tableData_fake.value = tableData.value.filter((item) => {
    return item.id === id;
  });
  ticketDialog.value = {
    show: true,
    title: "购票清单",
  };
  // 传递相应的参数给购票弹窗
  ticketData.value = {
    id: tableData_fake.value[0].id,
    // 购票用户名
    username: user.value.name,
    // 赛事场馆
    venue: tableData_fake.value[0].comLocation,
    // 赛事名称
    comInfo: tableData_fake.value[0].name,
    // 赛事时间
    comTime:
      tableData_fake.value[0].comTime + " " + tableData_fake.value[0].psTime,
    // 票价（座位信息）
    vipPrice: tableData_fake.value[0].vipPrice,
    standardPrice: tableData_fake.value[0].standardPrice,
    lowPrice: tableData_fake.value[0].lowPrice,
  };
};

const handleSizeChange = (page_size) => {
  // 切换size
  paginations.value.page_index = 1;
  paginations.value.page_size = page_size;
  tableData.value = allTableData.value.filter((item, index) => {
    return index < page_size;
  });
};

const handleCurrentChange = (page) => {
  // 获取当前页
  let index = paginations.value.page_size * (page - 1);
  // 数据的总数
  let nums = paginations.value.page_size * page;
  // 容器
  let tables = ref([]);
  for (let i = index; i < nums; i++) {
    if (allTableData.value[i]) {
      tables.value.push(allTableData.value[i]);
    }

    tableData.value = tables.value;
  }
};
// 按照名字筛选
const handleSearch_name = () => {
  // 进行信息筛选
  // 如果文本框的内容为空就不进行筛选，重新拉取留言信息
  if (!search_data.value.search_name) {
    proxy.$message({
      type: "warning",
      message: "请输入场馆进行筛选！",
    });
    getProfile();
    return;
  }
  tableData.value = tableData.value.filter((item) => {
    return item.name === search_data.value.search_name;
  });
  if (tableData.value.length === 0) {
    proxy.$message({
      type: "warning",
      message: "暂无此场馆的信息！",
    });
    getProfile();
    return;
  }
};
// 按照时间筛选
const handleSearch = () => {
  // 筛选
  // 如果任何一个时间为空 就不筛选
  if (!search_data.value.startTime || !search_data.value.endTime) {
    proxy.$message({
      type: "warning",
      message: "请选择时间区间",
    });
    getProfile();
    return;
  }

  const sTime = search_data.value.startTime.getTime();
  const eTime = search_data.value.endTime.getTime();

  allTableData.value = filterTableData.value.filter((item) => {
    let date = new Date(item.comTime);
    let time = date.getTime();
    return time >= sTime && time <= eTime;
  });

  // 分页数据
  setPaginations();
};
onMounted(() => {
  getProfile();
});
</script>
<style lang='less' scoped>
.comlist {
  height: 100vh;
  background-image: url(../assets/images/meixi3.jpg);
  background-size: 100% 100%;
  margin-left: 35px;
  padding: 16px;
  box-sizing: border-box;
  ::v-deep .el-table,
  .el-table__expanded-cell {
    background-color: rgba(204, 204, 204, 0.5);
  }

  ::v-deep .el-table tr {
    background-color: rgba(204, 204, 204, 0.6) !important;
  }
  ::v-deep .el-table--enable-row-transition .el-table__body td,
  .el-table .cell {
    background-color: rgba(204, 204, 204, 0.1);
  }
  // 筛选部分
  .search {
    float: left;
    display: flex;
    .el-form-item {
      margin-right: 10px;
    }
    .search_input {
      margin-left: 100px;
    }
  }

  .btnRight {
    float: right;
  }

  // 分页
  .pagination {
    float: right;
    margin-top: 10px;
  }
  .card_container {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
  }
  .cards {
    z-index: 99;
    margin-top: 5px;
    margin-right: 10px;
    width: 300px;
    height: 600px;
    transition: all 0.3s;
    background-color: rgba(204 204, 204, 0.7);
    display: flex;
    justify-content: center;
    .info {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .comname {
        display: block;
        font-size: 18px;
        color: rgba(0, 0, 0, 0.6);
      }
      .text {
        font-size: 18px;
        line-height: 30px;
        margin-top: 10px;
        background: linear-gradient(
          to right,
          rgb(27, 1, 29),
          rgb(114, 43, 158),
          rgb(192, 45, 45)
        );
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .opert {
        margin-top: 20px;
      }
    }
    .image {
      width: 250px;
      height: 145px;
      margin: 10px auto 0;
    }

    .username {
      text-align: center;
      display: block;
      margin-top: 5px;
      font-size: 20px;
    }

    &:hover {
      transform: scale(1.1);
      // background-color: rgba(255, 255, 255, 1);
    }
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
}
</style>