<template>
  <div class="dialog">
    <el-dialog class="el-dialog" :title="dialog.title" v-model="dialog.show">
      <div
        class="form"
        v-if="dialog.option === 'edit' || dialog.option === 'add'"
      >
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          labe-width="120px"
          style="margin: 10px; width: auto"
        >
          <el-form-item
            v-if="dialog.option === 'add'"
            label="赛事名称:"
            prop="comname"
            label-width="140px"
          >
            <el-col :span="18">
              <el-select v-model="formData.comname" placeholder="赛事名称">
              <el-option
                v-for="(formtype, index) in com_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
            </el-col>
          </el-form-item>

          <el-form-item prop="message" label="内容:" label-width="140px">
            <el-col :span="18">
              <el-input
              type="textarea"
              :rows="3"
              resize="none"
              autosize
              placeholder="请输入内容"
              v-model="formData.message"
            >
            </el-input>
            </el-col>
          </el-form-item>

          <el-form-item class="text_right" label-width="140px">
            <!-- <el-button @click="dialog.show = false">取消</el-button> -->
            <el-button type="info" @click="onSubmit(form)">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="info" v-if="dialog.option === 'look'">
        <h3 class="name" style="text-align: left">{{ formData.name }}</h3>
        <p class="type">{{ formData.comname }}</p>
        <p class="parti">说：{{ formData.message }}</p>
        <p class="date" style="text-align: right">{{ formData.messagetime }}</p>
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
const { proxy } = getCurrentInstance();
import { useStore } from "vuex";
const store = useStore();
const user = computed(() => {
  return store.getters.user;
});
const emits = defineEmits(["sendMsg"]);
const props = defineProps({
  dialog: Object,
  formData: Object,
});

const form = ref(null);
// 当前的日期，用于写入数据库，同时进行格式化
const getTimeformat = () => {
  let currentDate = new Date().toLocaleDateString().replace(/\//g, "-");
  return currentDate;
};
const com_list = ref([]);
// 获取所有的赛事名称
const getProfilecom = () => {
  proxy.$axios
    .get("/cominfo/allComs")
    .then((res) => {
      for (let index = 0; index < res.data.length; index++) {
        com_list.value.push(res.data[index].name);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const form_rules = reactive({
  comname: [{ required: true, message: "赛事名称不能为空", trigger: "blur" }],
  message: [{ required: true, message: "内容不能为空", trigger: "blur" }],
});

const onSubmit = (form) => {
  form.validate((valid) => {
    if (valid) {
      // 获取当日的时间
      if (props.dialog.option == "add") {
        props.formData.messagetime = getTimeformat();
      }
      const url =
        props.dialog.option == "add" ? "add" : `edit/${props.formData.id}`;
      proxy.$axios.post(`/message/${url}`, props.formData).then((res) => {
        if (props.dialog.option == "edit") {
          proxy.$message({ message: "留言更新成功", type: "success" });
        } else {
          proxy.$message({ message: "留言添加成功", type: "success" });
        }
        props.dialog.show = false;
        emits("update");
      });
    }
  });
};
onMounted(() => {
  getProfilecom();
});
</script>

<style lang="less" scoped>
/deep/.el-dialog .el-dialog__body{
      display: flex;
      justify-content: center;
      align-items: center;
}
.dialog {
  /deep/ .el-dialog__header {
    padding: 1vh 1vw 0 1vw;
    background-color: #040404;
    width: 100%;
  }
  /deep/ .el-dialog__title {
    display: block;
    width: 100%;
    line-height: 24px;
    font-size: 18px;
    color: #fff;
  }
      /*修改右上角按钮*/
    /deep/ .el-dialog__headerbtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: 0 0;
        // outline: 0;
        cursor: pointer;
        font-size: 30px;
        // border: 1px solid red;
        // border-radius: 50%;
    }

}
.info {
  border: 5px dashed rgb(81, 128, 187);
  background-color: rgba(204, 204, 204, 0.8);
  font-size: 18px;
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
