<template>
  <div class="comlist">
     <!--按钮 -->
    <div>
      <el-form class="opmenu" ref="add_data">
        <!-- 按比赛名称查找 -->
        <div class="search">
          <el-form-item class="search_input">
            <el-input
              placeholder="请输入用户名"
              prefix-icon="el-icon-search"
              v-model="searchinfo.search_name"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="serach_button">
            <el-button type="success" @click="handleSearch"
              ><el-icon><Search /></el-icon>筛选</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </div>
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
        <el-table-column label="序号" align="center" width="150" prop="id">
        </el-table-column>
        <el-table-column label="购票人" align="center" width="150" prop="username">
        </el-table-column>
        <el-table-column label="场馆" align="center" width="150" prop="venue">
        </el-table-column>
        <el-table-column
          label="赛事"
          align="center"
          width="150"
          prop="comInfo"
        ></el-table-column>
        <el-table-column
          label="观赛时间"
          align="center"
          width="150"
          prop="comTime"
        ></el-table-column>
        <el-table-column
          label="座位"
          align="center"
          width="150"
          prop="seatInfo"
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

// 获取表格数据
const getProfile = () => {
  proxy.$axios
    .get("/ticket/alltickets")
    .then((res) => {
      allTableData.value = res.data;
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
// 删除用户的购票信息
const handleDelete = (index, row) => {
  proxy.$axios
    .post(`/ticket/delete/${row.id}`)
    .then((res) => {
      proxy.$message("删除成功！");
      tableData.value.splice(0.1)
      getProfile()
    })
    .catch((err) => {
      proxy.$message.error("删除失败！");
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
// 搜索按钮的信息
let searchinfo = ref({
  search_name: "",
});
// 搜索过滤的函数
const handleSearch = () => {
  // 进行信息筛选
  // 如果文本框的内容为空就不进行筛选，重新拉取留言信息
  if (!searchinfo.value.search_name) {
    proxy.$message({
      type: "warning",
      message: "请输入赛事或用户名进行筛选！",
    });
    getProfile();
    return;
  }
  tableData.value = tableData.value.filter((item) => {
    return item.username === searchinfo.value.search_name;
  });
  if (tableData.value.length === 0) {
    proxy.$message({
      type: "warning",
      message: "暂无此人的购票信息！",
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
  background-image: url(../assets/images/b.gif);
  background-size: 100% 100%;
  margin-left: 35px;
  padding: 16px;
  box-sizing: border-box;
  ::v-deep .el-table--fit {
    padding: 20px;
  }
  ::v-deep .el-table,
  .el-table__expanded-cell {
    background-color: rgba(204, 204, 204, 0.4);
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

  // 分页
  .pagination {
    float: right;
    margin-top: 10px;
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
.opmenu .search {
  width: 350px;
  padding-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
}
</style>