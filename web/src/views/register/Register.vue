<template>
  <div class="register">
    <section class="form_container">
      <div class="form_tip">
        <span class="title">体育场馆在线售票信息管理系统-注册</span>
      </div>
      <!-- 表单部分 -->
      <el-form
        ref="registerForm"
        :model="registerUser"
        status-icon
        :rules="rules"
        label-width="100px"
        class="registerForm_demo"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="registerUser.name"
            type="text"
            autocomplete="off"
            placeholder="请输入用户名"
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerUser.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
          />
        </el-form-item>

        <el-form-item label="确认密码" prop="password2">
          <el-input
            v-model="registerUser.password2"
            type="password"
            autocomplete="off"
            placeholder="请确认密码"
          />
        </el-form-item>

        <el-form-item label="电话号码" prop="phone">
          <el-input
            v-model="registerUser.phone"
            type="text"
            autocomplete="off"
            placeholder="请输入电话号码"
          />
        </el-form-item>

        <el-form-item label="身份">
          <el-select v-model="registerUser.identify" placeholder="请选择身份">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="用户" value="用户"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="submitForm(registerForm)"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const { proxy } = getCurrentInstance();

const registerForm = ref(null);

const registerUser = reactive(
  // 表单内容
  {
    name: "",
    password: "",
    password2: "",
    phone: "",
    identify: "",
  }
);
// 密码的二次验证
const validatePass2 = (rule, value, callback) => {
  if (value !== registerUser.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};
const rules = reactive({
  name: [
    // 无内容时
    {
      // 是否需要
      required: true,
      // 提示信息
      message: "用户名不能为空!",
      // 触发条件
      trigger: "blur",
    },
    // 有内容时
    {
      min: 2,
      max: 8,
      message: "长度在2~8个字符之间",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空!",
      trigger: "blur",
    },
    {
      min: 4,
      max: 20,
      message: "长度在4~20之间",
      trigger: "blur",
    },
  ],
  password2: [
    {
      required: true,
      message: "确认密码不能为空!",
      trigger: "blur",
    },
    {
      validator: validatePass2,
      trigger: "blur",
    },
  ],
  phone: [
    // 添加正则表达式 pattern: /^1[3|5|7|8|9]\d{9}$/，验证手机号是否正确
    {
      required: true,
      message: "请输入电话号码！",
      trigger: "blur",
    },
    {
      // pattern为属性规定用于验证输入字段的模式，模式指的是正则表达式。
      pattern: /^1[3|5|7|8|9]\d{9}$/,
      message: "请输入正确的号码格式",
      trigger: "blur",
    },
  ],
});

// 注册事件
const submitForm = (registerForm) => {
  registerForm.validate((valid) => {
    if (valid) {
      proxy.$axios
        .post("/users/register", registerUser)
        .then((res) => {
          proxy.$axios
            .post("/userinfo/add", registerUser)
            .then((res) => {
              // 注册成功
              proxy.$message({
                messaeg: "账号注册成功",
                type: "success",
              });
              // 路由跳转
              router.push("/login");
            })
            .catch((err) => {
              proxy.$message.error("用户信息填写失败！");
            });
        })
        .catch((err) => {
          proxy.$message.error("注册失败！");
        });
    } else {
      proxy.$message({
        type: "error",
        message: "错误提交申请",
      });
      return false;
    }
  });
};
</script>

<style lang="less" scoped>
.register {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  background: url(../../assets/images/register.webp) no-repeat center center;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;

  .form_container {
    width: 400px;
    // height: 210px;
    position: absolute;
    padding: 25px;
    border-radius: 6px;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .form_tip {
      .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: rgb(153, 78, 78);
      }
    }

    // 表格部分
    .el-form {
      margin-top: 20px;
      padding: 20px 35px 20px 4px;
      border-radius: 5px;
      // box-shadow: 0px 5px 10px #cccc;
      background: rgba(0, 0, 0, 0.5);
      box-sizing: border-box;
      box-shadow: 0 15px 25px rgba(0, 0, 0, 0.8);

      :deep(.el-form-item__label) {
        color: #fff;
        padding-top: 5px;
      }

      :deep(.el-input__wrapper) {
        background-color: rgb(94, 90, 90);
        .el-input__inner {
          color: #fff;
          padding: 20px 0;
        }
      }

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
