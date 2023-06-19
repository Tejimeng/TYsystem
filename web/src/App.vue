<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import zhCn from "element-plus/lib/locale/lang/zh-cn";
// 防止页面刷新丢失vuex中的数据
import jwt_decode from "jwt-decode";
import { useStore } from "vuex";
import { onMounted } from "vue";
const store = useStore();

// 判断是否为空的方法
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

onMounted(() => {
  if (localStorage.mytoken) {
    const decoded = jwt_decode(localStorage.mytoken);
    // token存储到vuex中
    store.dispatch("setAuthenticated", !isEmpty(decoded));
    store.dispatch("setUser", decoded);
  }
});
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body .el-table th.gutter{
    display: table-cell!important;
}
 
body .el-table colgroup.gutter{
    display: table-cell!important;
}

</style>
