<template>
  <div class="dialog">
    <el-dialog :title="dialog.title" v-model="dialog.show">
      <div v-if="user.identify == '管理员'" class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          labe-width="120px"
          style="margin: 10px; width: auto"
        >
          <el-form-item prop="name" label="赛事名称:" label-width="140px">
            <el-input type="text" v-model="formData.name"></el-input>
          </el-form-item>

          <el-form-item label="赛事类型:" prop="comType" label-width="140px">
            <el-select v-model="formData.comType" placeholder="赛事类型">
              <el-option
                v-for="(formtype, index) in form_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            prop="organizer"
            label="赛事组织者:"
            label-width="140px"
          >
            <el-input type="text" v-model="formData.organizer"></el-input>
          </el-form-item>

          <el-form-item
            prop="participant"
            label="赛事参与者:"
            label-width="140px"
          >
            <el-input type="text" v-model="formData.participant"></el-input>
          </el-form-item>

          <el-form-item prop="comTime" label="赛事时间:" label-width="140px">
            <el-date-picker
              v-model="formData.comTime"
              type="date"
              placeholder="选择日期(当天)"
            />
          </el-form-item>

          <el-form-item
            prop="comLocation"
            label="赛事地点:"
            label-width="140px"
          >
            <el-select v-model="formData.comLocation" placeholder="赛事地点">
              <el-option
                v-for="(formtype, index) in venue_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="comResult" label="赛事结果:" label-width="140px">
            <el-input type="text" v-model="formData.comResult"></el-input>
          </el-form-item>

          <el-form-item prop="vipPrice" label="vip票价:" label-width="140px">
            <el-input type="number" v-model="formData.vipPrice"></el-input>
          </el-form-item>

          <el-form-item
            prop="standardPrice"
            label="标准票价:"
            label-width="140px"
          >
            <el-input type="number" v-model="formData.standardPrice"></el-input>
          </el-form-item>

          <el-form-item prop="lowPrice" label="低价票价:" label-width="140px">
            <el-input type="number" v-model="formData.lowPrice"></el-input>
          </el-form-item>

          <el-form-item prop="psTime" label="赛事具体时间:" label-width="140px">
            <el-time-select
              v-model="formData.psTime"
              :max-time="endTime"
              class="mr-4"
              placeholder="开始时间"
              start="08:30"
              step="00:15"
              end="18:30"
            />
            <el-time-select
              v-model="formData.peTime"
              :min-time="startTime"
              placeholder="结束时间"
              start="08:30"
              step="00:15"
              end="18:30"
            />
          </el-form-item>

          <el-form-item
            label="相关图片链接:"
            label-width="140px"
          >
            <el-input type="text" v-model="formData.placard"></el-input>
          </el-form-item>

          <el-form-item class="text_right" label-width="140px">
            <el-button @click="dialog.show = false">取消</el-button>
            <el-button type="primary" @click="onSubmit(form)">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 有关赛事的详细信息 -->
      <div class="info" v-if="user.identify == '用户'">
        <h3 class="name">{{ formData.name }}</h3>
        <img class="imginfo" :src="formData.placard" alt="" />
        <p class="type">{{ formData.comType }}</p>
        <p class="parti">{{ formData.participant }}</p>
        <p class="date">日期：{{ formData.comTime }}</p>
        <p class="loca">地点：{{ formData.comLocation }}</p>
        <p class="price">
          低价席{{ formData.lowPrice }}￥一人·标准席{{
            formData.standardPrice
          }}￥一人·贵宾席{{ formData.vipPrice }}￥一人
        </p>
        <p class="start">开始时间：{{ formData.psTime }}</p>
        <p class="start">结束时间：{{ formData.peTime }}</p>
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
import { useStore } from "vuex";
const store = useStore();
const { proxy } = getCurrentInstance();
const user = computed(() => {
  return store.getters.user;
});
const emits = defineEmits(["sendMsg"]);
// 接受传递过来的数据
const props = defineProps({
  dialog: Object,
  formData: Object,
});

const form = ref(null);
// 定义比赛类型数组
const form_type_list = ref([
  "多人竞技",
  "单人竞技",
  "多人合作",
  "小组赛",
  "个人赛",
  "团体赛",
]);
// 定义票价规则
let price_rules = [
  { required: true, message: "赛事票价不能为空", trigger: "blur" },
  { pattern: /^[+]{0,1}(\d+)$/, message: "票价需在0以上", trigger: "blur" },
];
// 定义表单要提交内容的输入规则
const form_rules = reactive({
  name: [{ required: true, message: "赛事名称不能为空", trigger: "blur" }],
  comType: [{ required: true, message: "赛事类型不能为空", trigger: "blur" }],
  organizer: [
    { required: true, message: "赛事组织者不能为空", trigger: "blur" },
  ],
  participant: [
    { required: true, message: "赛事参与者不能为空", trigger: "blur" },
  ],
  comTime: [{ required: true, message: "赛事时间不能为空", trigger: "blur" }],
  comLocation: [
    { required: true, message: "赛事地点不能为空", trigger: "blur" },
  ],
  comResult: [{ required: true, message: "赛事结果不能为空", trigger: "blur" }],
  vipPrice: price_rules,
  standardPrice: price_rules,
  lowPrice: price_rules,
  psTime: [{ required: true, message: "开始时间不能为空", trigger: "blur" }],
  peTime: [{ required: true, message: "结束时间不能为空", trigger: "blur" }],
});
// 获取所有赛事场馆
const venue_list = ref([]);
const getProfilevenue = () => {
  proxy.$axios
    .get("/venueinfo/allVenues")
    .then((res) => {
      for (let index = 0; index < res.data.length; index++) {
        venue_list.value.push(
          res.data[index].location.concat(res.data[index].name)
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const onSubmit = (form) => {
  form.validate((valid) => {
    if (valid) {
      const url =
        props.dialog.option == "add" ? "add" : `edit/${props.formData.id}`;
      proxy.$axios.post(`/cominfo/${url}`, props.formData).then((res) => {
        // 编辑成功
        if (props.dialog.option == "edit") {
          proxy.$message({ message: "数据更新成功", type: "success" });
        } else {
          // 添加成功
          proxy.$message({ message: "数据添加成功", type: "success" });
        }
        // 隐藏dialog
        props.dialog.show = false;
        // 数据添加后 需要自己刷新 显然不合理
        // this.$emits('update') vue3 setup语法糖不是这样写
        emits("update");
      });
    }
  });
};
onMounted(() => {
  getProfilevenue();
});
</script>

<style lang="less" scoped>
/deep/.el-dialog .el-dialog__body{
      display: flex;
      justify-content: center;
      align-items: center;
}
.info {
  border: 3px solid #ccc;
  // background-color: rgba(204, 204, 204, 0.8);
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
