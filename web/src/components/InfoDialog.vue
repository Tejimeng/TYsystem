<template>
  <div class="dialog">
    <el-dialog :title="dialog.title" width="35%" v-model="dialog.show">
      <div class="form" v-if="dialog.option == 'edit'">
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          labe-width="120px"
          style="margin: 10px; width: auto"
        >
          <h3 class="name">{{ formData.name }}</h3>

          <el-form-item label="年龄:" prop="age" label-width="140px">
            <el-col :span="10">
                <el-input type="text" v-model="formData.age"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item prop="addr" label="位居:" label-width="140px">
            <el-col :span="10"><el-input type="text" v-model="formData.addr"></el-input></el-col>
          </el-form-item>

          <el-form-item prop="birth" label="出生日期:" label-width="140px">
            <el-date-picker
              v-model="formData.birth"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>

          <el-form-item prop="sex" label="性别:" label-width="140px">
            <el-select v-model="formData.sex" placeholder="性别">
              <el-option
                v-for="(formtype, index) in form_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="avatar" label="头像链接:" label-width="140px">
            <el-col :span="20"><el-input type="text" v-model="formData.avatar"></el-input></el-col>
          </el-form-item>
          <el-form-item class="text_right" label-width="140px">
            <el-button @click="dialog.show = false">取消</el-button>
            <el-button type="primary" @click="onSubmit(form)">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 查看用户的个人信息 -->
      <div class="info" v-if="dialog.option == 'look'">
        <div class="infotext">
          <p class="touxiang"><img :src="formData.avatar" alt=""></p>
          <h3 class="name">{{ formData.name }}</h3>
          <p class="type">年龄：{{ formData.age }}</p>
          <p class="parti">现居：{{ formData.addr }}</p>
          <p class="date">出生日期：{{ formData.birth }}</p>
          <p class="loca">性别：{{ formData.sex }}</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, defineEmits, computed } from "vue";
const { proxy } = getCurrentInstance();
const emits = defineEmits(["sendMsg"]);
const props = defineProps({
  dialog: Object,
  formData: Object,
});
const form = ref(null);
const form_type_list = ref(["男", "女"]);

const form_rules = reactive({
  name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  age: [
    { required: true, message: "年龄不能为空", trigger: "blur" },
    {
      pattern: /^[+]{0,1}(\d+)$/,
      message: "请填写正确的年龄",
      trigger: "blur",
    },
  ],
  addr: [{ required: true, message: "位置不能为空", trigger: "blur" }],
  birth: [{ required: true, message: "出生日期不能为空", trigger: "blur" }],
  sex: [{ required: true, message: "性别不能为空", trigger: "blur" }],
  avatar:[{ required: true, message: "头像链接不能为空", trigger: "blur" }],
});

const onSubmit = (form) => {
  form.validate((valid) => {
    if (valid) {
      proxy.$axios
        .post(`/userinfo/edit/${props.formData.id}`, props.formData)
        .then((res) => {
          console.log(props.formData);
          if (props.dialog.option == "edit") {
            proxy.$message({ message: "数据更新成功", type: "success" });
          }
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
.dialog {
   .el-dialog__body {
 
      display: flex;
 
      justify-content: center;
 
      align-content: center;
 
}
  .name {
    font-size: 35px;
    margin-bottom: 15px;
  }
  el-input{
    width: 100px;
  }
}
.info {
  display: flex;
  justify-content: space-around;
  font-size: 18px;
  font-weight: bolder;
  .imginfo {
    margin-top: 20px;
    width: 400px;
    height: 200px;
  }
  .infotext {
    display: flex;
    flex-direction:column ;
    justify-content: space-around;
  }
  .name {
    font-size: 35px;
  }
  p {
    margin-top: 8px;
  }
}
</style>
