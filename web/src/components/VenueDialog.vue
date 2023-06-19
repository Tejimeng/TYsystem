<template>
  <div class="dialog">
    <el-dialog :title="dialog.title" v-model="dialog.show" width="35%">
      <div
        v-if="dialog.option === 'edit' || dialog.option === 'add'"
        class="form"
      >
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          labe-width="120px"
          style="margin: 10px; width: auto"
        >
          <el-form-item prop="name" label="场馆名称:" label-width="140px">
            <el-col :span="24"
              ><el-input type="text" v-model="formData.name"></el-input
            ></el-col>
          </el-form-item>

          <el-form-item label="位置:" prop="location" label-width="140px">
            <el-col :span="24"
              ><el-input type="text" v-model="formData.location"></el-input
            ></el-col>
          </el-form-item>

          <el-form-item prop="seatinfo" label="席位信息:" label-width="140px">
            <el-col :span="24"
              ><el-input type="text" v-model="formData.seatinfo"></el-input
            ></el-col>
          </el-form-item>

          <el-form-item label="VIP席位:" prop="vipSeat" label-width="140px">
            <el-col :span="24"
              ><el-input type="number" v-model="formData.vipSeat"></el-input
            ></el-col>
          </el-form-item>

          <el-form-item
            label="标准席位:"
            prop="standardSeat"
            label-width="140px"
          >
            <el-col :span="24"
              ><el-input
                type="number"
                v-model="formData.standardSeat"
              ></el-input
            ></el-col>
          </el-form-item>

          <el-form-item label="低价席位:" prop="lowSeat" label-width="140px">
            <el-col :span="24"
              ><el-input type="number" v-model="formData.lowSeat"></el-input
            ></el-col>
          </el-form-item>

          <el-form-item label="备注:" prop="remarks" label-width="140px">
            <el-col :span="24"
              ><el-input type="textarea" v-model="formData.remarks"></el-input
            ></el-col>
          </el-form-item>

          <el-form-item label="场馆封面:" prop="placard" label-width="140px">
            <el-col :span="24"
              ><el-input type="text" v-model="formData.placard"></el-input
            ></el-col>
          </el-form-item>

          <el-form-item class="text_right" label-width="140px">
            <el-button @click="dialog.show = false">取消</el-button>
            <el-button type="primary" @click="onSubmit(form)">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 查看详情 -->
      <div class="info" v-if="dialog.option === 'look'">
        <h3 class="name">{{ formData.name }}</h3>
        <img class="imginfo" :src="formData.placard" alt="" />
        <p class="type">{{ formData.location }}</p>
        <p class="parti">{{ formData.seatinfo }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, defineEmits, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const { proxy } = getCurrentInstance();
const user = computed(() => {
  return store.getters.user;
});
const emits = defineEmits(["sendMsg"]);
const props = defineProps({
  dialog: Object,
  formData: Object,
});

const form = ref(null);

const form_rules = reactive({
  name: [{ required: true, message: "场馆名称不能为空", trigger: "blur" }],
  location: [{ required: true, message: "场馆位置不能为空", trigger: "blur" }],
  seatinfo: [
    { required: true, message: "场馆席位信息不能为空", trigger: "blur" },
  ],
  vipSeat: [
    { required: true, message: "vip席位信息不能为空", trigger: "blur" },
  ],
  standardSeat: [
    { required: true, message: "标准席位信息不能为空", trigger: "blur" },
  ],
  lowSeat: [
    { required: true, message: "低价席位信息不能为空", trigger: "blur" },
  ],
});

const onSubmit = (form) => {
  form.validate((valid) => {
    if (valid) {
      const url =
        props.dialog.option == "add" ? "add" : `edit/${props.formData.id}`;
      proxy.$axios.post(`/venueinfo/${url}`, props.formData).then((res) => {
        // 编辑成功
        if (props.dialog.option == "edit") {
          proxy.$message({ message: "数据更新成功", type: "success" });
        } else {
          // 添加成功
          proxy.$message({ message: "数据添加成功", type: "success" });
        }
        // 隐藏dialog
        props.dialog.show = false;
        emits("update");
      });
    }
  });
};
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
