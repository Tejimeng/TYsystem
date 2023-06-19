<template>
  <div class="comlist">
    <!-- table部分 -->
    <div class="table_container">
      <el-table
        ref="table"
        :data="tableData"
        style="width: 100%"
        max-height="750"
        :default-sort="{ prop: 'id', order: 'descending' }"
        stripe
      >
        <el-table-column
          label="序号"
          align="center"
          width="450"
          prop="id"
          sortable
        >
        </el-table-column>
        <el-table-column
          label="用户名"
          align="center"
          width="750"
          prop="name"
        ></el-table-column>

        <!-- 操作部分 -->
        <el-table-column
          label="操作"
          prop="operation"
          width="350"
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
import DialogVue from "../components/InfoDialog.vue";
const { proxy } = getCurrentInstance();
// 初始表单
let tableData = ref([]);
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
  name: "",
  age: "",
  addr: "",
  birth: "",
  sex: "",
  id: "",
  avatar:""
});

// 获取表格数据
const getProfile = () => {
  proxy.$axios
    .get("/userinfo/allUsers")
    .then((res) => {
      // 对时间的格式进行处理
      for (let index = 0; index < res.data.length; index++) {
        res.data[index].birth = res.data[index].birth.slice(0, 10);
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
    title: "修改个人信息",
    option: "edit",
  };

  formData.value = {
    avatar: row.avatar,
    name: row.name,
    age: row.age,
    addr: row.addr,
    birth: row.birth,
    sex: row.sex,
    id: row.id,
  };
};
// 用户查看详情的按钮
const handleInfo = (index, row) => {
  dialog.value = {
    show: true,
    title: "该用户信息如下:",
    option: "look",
  };
  formData.value = {
    avatar: row.avatar,
    name: row.name,
    age: row.age,
    addr: row.addr,
    birth: row.birth,
    sex: row.sex,
    id: row.id,
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
onMounted(() => {
  getProfile();
});
</script>
<style lang='less' scoped>
.comlist {
  height: 100vh;
  background-image: url(../assets/images/R.gif);
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
  .btnRight {
    float: right;
  }

  // 分页
  .pagination {
    float: right;
    margin-top: 10px;
  }
}
</style>