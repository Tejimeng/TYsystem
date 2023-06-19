<template>
<div class="donghua"><particles ></particles></div>
  <div class="index">
    <HeaderNav />
    <LeftMenu />
    <div class="routerall">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import HeaderNav from "../components/HeaderNav.vue";
import LeftMenu from "../components/LeftMenu.vue";
import Particles from '@/components/particles/index.vue'
export default {
  name: "index",
  components: {
    HeaderNav,
    LeftMenu,
    Particles
  },
};
</script>
<style lang="less" scoped>
.index {
  width: 100%;
  z-index: 999999;
  height: 100vh;
  z-index: 999;
  overflow: hidden;
  // .routerall{
  //   width: 100%;
  // }
}
.donghua{
  // z-index: 9;
  position: absolute;
  opacity: .6;
}
</style>