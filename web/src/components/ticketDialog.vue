<template>
  <div class="dialog">
    <el-dialog :title="ticketDialog.title" v-model="ticketDialog.show">
      <div class="form">
        <el-form
          ref="form"
          rules="codeRules"
          :model="ticketData"
          labe-width="120px"
          style="margin: 10px; width: auto"
        >
          <el-form-item label="购票用户:" label-width="140px">
            <el-input type="text" v-model="ticketData.username"></el-input>
          </el-form-item>

          <el-form-item label="赛事场馆:" label-width="140px">
            <el-input
              type="text"
              readonly="true"
              v-model="ticketData.venue"
            ></el-input>
          </el-form-item>

          <el-form-item label="赛事名称:" label-width="140px">
            <el-input
              type="text"
              readonly="true"
              v-model="ticketData.comInfo"
            ></el-input>
          </el-form-item>

          <el-form-item label="赛事开始时间:" label-width="140px">
            <el-input
              type="text"
              readonly="true"
              v-model="ticketData.comTime"
            ></el-input>
          </el-form-item>

          <el-radio-group v-model="radio.seat">
            <el-radio :label="radio.vip"
              >VIP席位：{{ ticketData.vipPrice }}￥</el-radio
            >
            <el-radio :label="radio.standard"
              >标准席位：{{ ticketData.standardPrice }}￥</el-radio
            >
            <el-radio :label="radio.low"
              >低价席位：{{ ticketData.lowPrice }}￥</el-radio
            >
          </el-radio-group>

          <!-- 支付验证模块 -->
          <el-form-item prop="code" label-width="140px">
            <el-col :span="13">
              <el-input
                v-model="formLogin.code"
                auto-complete="off"
                placeholder="请输入验证码"
                size=""
              ></el-input>
            </el-col>
            <el-col :span="11">
              <div class="login-code" width="100%" @click="refreshCode()">
                <!--验证码组件-->
                <security :identifyCode="icode.identifyCode"></security>
              </div>
            </el-col>
          </el-form-item>

          <!-- 按钮功能区域 -->
          <el-form-item class="text_right" label-width="140px">
            <el-button @click="ticketDialog.show = false">取消</el-button>
            <el-button type="primary" @click="onSubmit(form)">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import {
  ref,
  reactive,
  getCurrentInstance,
  defineEmits,
  computed,
  onMounted,
} from "vue";
// 解构导入
import { useStore } from "vuex";
// 直接引入绘制验证码图形的组件
import Security from "./Security.vue";
console.log(Security);
const store = useStore();
const { proxy } = getCurrentInstance();
const user = computed(() => {
  return store.getters.user;
});
// 定义验证码有关的变量
const formLogin = ref({
  code: "",
});
const icode = ref({
  identifyCodes: "23456789abcdefjhjknpqrsduvwxyz", //随机串内容
  identifyCode: "",
});
const codeRules = reactive({
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});
// 定义验证码有关的函数
// 重置验证码
const refreshCode = () => {
  console.log("1111");
  icode.value.identifyCode = "";
  makeCode(icode.value.identifyCodes, 4);
};
const makeCode = (o, l) => {
  for (let i = 0; i < l; i++) {
    icode.value.identifyCode +=
      icode.value.identifyCodes[randomNum(0, icode.value.identifyCodes.length)];
  }
};
const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// 消息弹窗的组件
const emits = defineEmits(["sendMsg"]);
// 接受传递过来的数据
const props = defineProps({
  ticketDialog: Object,
  ticketData: Object,
});
// 定义票价单选信息
const radio = ref({
  vip: "VIP席位",
  standard: "标准席位",
  low: "低价席位",
  seat: "",
});
//获取当前日期函数(带格式)
const getNowFormatDate = () => {
  let date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    strDate = date.getDate();
  return `${year}-${month}-${strDate}`;
};
// 定义检验表单
const form = ref({});
// 定义提交表单
let ticketForm = ref({});
// 提交请求的事件
const onSubmit = (form) => {
  // 提交前检验验证码
  if (
    formLogin.value.code.toLowerCase() !==
    icode.value.identifyCode.toLowerCase()
  ) {
    proxy.$message({ message: "请填写正确的验证码", type: "warning" });
    refreshCode();
    // 验证失败，直接返回
    return;
  }
  // 定义提交表单
  ticketForm.value = {
    username: props.ticketData.username,
    venue: props.ticketData.venue,
    comInfo: props.ticketData.comInfo,
    ticketTime: getNowFormatDate(),
    comTime: props.ticketData.comTime,
    seatInfo: radio.value.seat,
    ispay: 1,
  };
  form.validate((valid) => {
    if (valid) {
      proxy.$axios.post(`/ticket/add`, ticketForm.value).then((res) => {
        // 添加成功
        proxy.$message({ message: "购票成功！", type: "success" });
        // 隐藏dialog
        props.ticketDialog.show = false;
        // 数据添加后 需要自己刷新 显然不合理
        emits("update");
      });
    }
  });
};
onMounted(() => {
  // 初始化验证码
  icode.value.identifyCode = "";
  makeCode(icode.value.identifyCodes, 4);
});
</script>

<style lang="less" scoped>
// 样式穿透
/deep/.el-dialog .el-dialog__body {
  display: flex;
  justify-content: center;
  align-items: center;
}
.info {
  border: 5px dashed #000;
  background-color: rgba(204, 204, 204, 0.8);
  font-size: 18px;
  width: 100%;
  height: 100%;
  font-weight: bolder;
  .imginfo {
    margin-top: 20px;
    width: 500px;
    height: 300px;
  }
  .name {
    font-size: 35px;
  }
  p {
    margin-top: 8px;
  }
}
</style>
