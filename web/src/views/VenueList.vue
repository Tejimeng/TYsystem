<template>
  <div class="comlist">
    <!-- 添加按钮 -->
    <div>
      <el-form ref="add_data" :model="search_data">
        <!-- 按照场馆名字查找 -->
        <div class="search">
          <el-form-item class="search_input">
            <el-input
              placeholder="请输入场馆名称"
              prefix-icon="el-icon-search"
              v-model="searchinfo.search_name"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="serach_button">
            <el-button type="success" @click="handleSearch"
              ><el-icon><Search /></el-icon>查找</el-button
            >
          </el-form-item>
        </div>
        <!-- 筛选 -->
        <el-form-item class="btnRight">
          <el-button
            type="primary"
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
        :data="tableData"
        style="width: 100%; justify-content: space-between"
        max-height="550"
        :default-sort="{ prop: 'id', order: 'descending' }"
        stripe
        align="center"
      >
        <el-table-column
          label="序号"
          align="center"
          width="100"
          prop="id"
          sortable
        >
        </el-table-column>
        <el-table-column
          label="名称"
          align="center"
          width="150"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="位置"
          width="150"
          align="center"
          prop="location"
        ></el-table-column>
        <el-table-column
          label="席位信息"
          width="150"
          align="center"
          prop="seatinfo"
        ></el-table-column>
        <el-table-column
          label="vip席位"
          width="150"
          align="center"
          prop="vipSeat"
        ></el-table-column>
        <el-table-column
          label="标准席位"
          width="150"
          align="center"
          prop="standardSeat"
        ></el-table-column>
        <el-table-column
          label="低价席位"
          width="150"
          align="center"
          prop="lowSeat"
        ></el-table-column>
        <el-table-column
          label="备注"
          width="150"
          align="center"
          prop="remarks"
        ></el-table-column>

        <!-- 操作部分 -->
        <el-table-column
          label="操作"
          prop="operation"
          width="270"
          align="center"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              size="small"
              type="success"
              @click="handleInfo(scope.$index, scope.row)"
            >
              <el-icon><Edit /></el-icon>详情</el-button
            >
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
          <span class="username">{{ value.location }}</span>

          <img
            :src="value.placard"
            class="image"
          />
          <div style="padding: 14px" class="info">
            <span class="comname">{{ value.name }}</span>
            <div class="bottom clearfix">
              <p class="text">{{ value.seatinfo }}</p>
              <div class="opert">
                <el-button
                  size="small"
                  type="success"
                  @click="handleInfo_user(value.id)"
                >
                  <el-icon><Edit /></el-icon>详细信息</el-button
                >
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <dialog-vue
      :dialog="dialog"
      @update="getProfile"
      :formData="formData"
    ></dialog-vue>
  </div>
</template>
<script setup>
import { Timer, Edit, Delete, Plus, Search } from "@element-plus/icons";
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import DialogVue from "../components/VenueDialog.vue";
import { useStore } from "vuex";
const store = useStore();
const { proxy } = getCurrentInstance();
// 获取用户身份信息，用于判断用户的权限
const user = computed(() => {
  return store.getters.user;
});
// 搜索按钮的信息
let searchinfo = ref({
  search_name: "",
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
// 向子组件传递的表单
let formData = ref({
  placard:"",
  name: "",
  location: "",
  seatinfo: "",
  vipSeat: "",
  standardSeat: "",
  lowSeat: "",
  remarks: "",
  id: "",
});

// 获取表格数据
const getProfile = () => {
  proxy.$axios
    .get("/venueinfo/allVenues")
    .then((res) => {
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
    title: "修改场馆信息",
    option: "edit",
  };

  formData.value = {
    placard:row.placard,
    name: row.name,
    location: row.location,
    seatinfo: row.seatinfo,
    vipSeat: row.vipSeat,
    standardSeat: row.standardSeat,
    lowSeat: row.lowSeat,
    remarks: row.remarks,
    id: row.id,
  };
};
// 删除
const handleDelete = (index, row) => {
  proxy.$axios.post(`/venueinfo/delete/${row.id}`).then((res) => {
    proxy.$message("删除成功！");
    tableData.value.splice(0.1)
    getProfile();
  });
};
const handleAdd = () => {
  // 添加
  dialog.value = {
    show: true,
    title: "添加场馆",
    option: "add",
  };

  formData.value = {
    placard:"",
    name: "",
    location: "",
    seatinfo: "",
    vipSeat: "",
    standardSeat: "",
    lowSeat: "",
    remarks: "",
    id: "",
  };
};
// 管理员查看详情的按钮
const handleInfo = (index, row) => {
  dialog.value = {
    show: true,
    title: "该场馆信息如下:",
    option: "look",
  };
  formData.value = {
    placard:row.placard,
    name: row.name,
    location: row.location,
    seatinfo: row.seatinfo,
    vipSeat: row.vipSeat,
    standardSeat: row.standardSeat,
    lowSeat: row.lowSeat,
    remarks: row.remarks,
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
    location: tableData_fake.value[0].location,
    seatinfo: tableData_fake.value[0].seatinfo,
    vipSeat: tableData_fake.value[0].vipSeat,
    standardSeat: tableData_fake.value[0].standardSeat,
    lowSeat: tableData_fake.value[0].lowSeat,
    remarks: tableData_fake.value[0].remarks,
    id: tableData_fake.value[0].id,
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
// 搜索过滤的函数
const handleSearch = () => {
  // 进行信息筛选
  // 如果文本框的内容为空就不进行筛选，重新拉取留言信息
  if (!searchinfo.value.search_name) {
    proxy.$message({
      type: "warning",
      message: "请输入场馆进行筛选！",
    });
    getProfile();
    return;
  }
  tableData.value = tableData.value.filter((item) => {
    return item.name === searchinfo.value.search_name;
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
onMounted(() => {
  getProfile();
});
</script>
<style lang='less' scoped>
.comlist {
  height: 100vh;
  background-image: url(../assets/images/meixi1.jpg);
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
  .btnRight {
    float: right;
  }
  .search {
    width: 350px;
    padding-top: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  // 分页
  .pagination {
    float: right;
    margin-top: 10px;
  }
  .card_container {
    padding-top: 50px;
    margin-left: 50px;
    width: 1400px;
    height: 600px;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
  }
  .cards {
    z-index: 999;
    margin-top: 5px;
    margin-right: 10px;
    padding-top: 50px;
    width: 300px;
    height: 500px;
    transition: all 0.3s;
    background-color: rgba(204, 204, 204, 0.5);
    display: flex;
    justify-content: center;
    .info {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .comname {
        display: block;
        font-size: 15px;
        color: rgba(0, 0, 0, 0.6);
      }
      .text {
        font-size: 14px;
        line-height: 30px;
        // text-align: left;
        text-indent: 2em;
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
        margin-top: 5px;
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