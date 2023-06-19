<template>
  <div class="comlist">
    <!-- table部分 -->
    <div class="table_container">
      <el-table
        ref="table"
        :data="tableData"
        style="width: 100%; justify-content: space-between"
        max-height="550"
        :default-sort="{ prop: 'comTime', order: 'descending' }"
        stripe
        align="center"
      >
        <el-table-column
          label="序号"
          align="center"
          width="265"
          prop="id"
          sortable
        >
        </el-table-column>
        <el-table-column
          label="名称"
          align="center"
          width="265"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="身份"
          width="265"
          align="center"
          prop="identify"
        ></el-table-column>
        <el-table-column
          label="电话"
          width="265"
          align="center"
          prop="phone"
        ></el-table-column>
        <el-table-column
          label="注册日期"
          width="265"
          align="center"
          prop="regDate"
        ></el-table-column>
        <!-- 操作部分 -->
        <el-table-column
          label="操作"
          prop="operation"
          width="100"
          align="center"
          fixed="right"
        >
          <template #default="scope">
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
const { proxy } = getCurrentInstance();
// 初始表单
let tableData = ref([]);
// 过滤后的表单
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
  identify: "",
  phone: "",
  regDate: "",
  id: "",
});

// 获取表格数据
const getProfile = () => {
  proxy.$axios
    .get("/userlist/allUsers")
    .then((res) => {
      allTableData.value = res.data;
      // 设置分页数据
      setPaginations();
    })
    .catch((err) => {
      console.log(err);
    });
};
// const resetLazyTree= resetLazyTree(()=>{
// 		// $refs.table 在<el-table ref="table">中定义
// 		proxy.$set(proxy.$refs.table.store.states, 'lazyTreeNodeMap', {})
// 	})
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
// 删除用户注册信息的同时还要删除用户的个人信息
const handleDelete = (index, row) => {
  proxy.$axios
    .post(`/userlist/delete/${row.id}`)
    .then((res) => {
      proxy.$message("删除用户成功！");
      proxy.$axios
        .post(`/userinfo/delete_name/${row.name}`)
        .then((res) => {
          proxy.$message("删除用户信息成功！");
          tableData.value.splice(0.1)
          getProfile();
        })
        .catch((err) => {
          proxy.$message.error("删除用户信息失败！");
        });
    })
    .catch((err) => {
      proxy.$message.error("删除用户失败！");
    });
  getProfile();
};
// 分页
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
  background-image: url(../assets/images/c.gif);
  background-size: 100% 100%;
  margin-left: 35px;
  padding: 16px;
  box-sizing: border-box;
  ::v-deep .el-table--fit {
    padding: 20px;
  }
  ::v-deep .el-table,
  .el-table__expanded-cell {
    background-color: rgba(204, 204, 204, .4);
  }

  ::v-deep .el-table tr {
    background-color: rgba(204, 204, 204, .6) !important;
  }
  ::v-deep .el-table--enable-row-transition .el-table__body td,
  .el-table .cell {
    background-color: rgba(204, 204, 204, .1);
  }
  // 筛选部分
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