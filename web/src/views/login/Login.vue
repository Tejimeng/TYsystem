<template>
  <div class="login">
    <div class="box">
      <h2>欢迎回来</h2>
      <el-form ref="loginForm" :model="loginUser" :rules="rules" status-icon>
        <el-form-item class="inputBox" prop="name">
          <input
            type="text"
            v-model="loginUser.name"
            name="Username"
            autocomplete="off"
            required=""
          />
          <label>用户名</label>
        </el-form-item>
        <el-form-item class="inputBox" prop="password">
          <input
            type="password"
            v-model="loginUser.password"
            name="Password"
            autocomplete="off"
            required=""
          />
          <label>密码</label>
        </el-form-item>
        <div class="qiehuan">
          <p>
            还没有账号？<router-link class="a" to="/register"
              >立即创建</router-link
            >
          </p>
        </div>
        <input type="button" @click="submitForm(loginForm)" value="登录" />
      </el-form>
    </div>
  </div>
</template>

<script setup>
import jwt_decode from "jwt-decode";
import { reactive, ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import store from "../../store";
const router = useRouter();
const { proxy } = getCurrentInstance();

const loginForm = ref(null);

const loginUser = reactive({
  name: "",
  password: "",
});
const rules = reactive({
  name: [{ required: true, message: "用户名不能为空!", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空!", trigger: "blur" }],
});
// 提交事件
const submitForm = (loginForm) => {
  if (loginUser.name !== "" && loginUser.password !== "") {
    loginForm.validate((valid) => {
      if (valid) {
        proxy.$axios.post("/users/login", loginUser)
        .then((res) => {
          // 登录成功
          // 获取token,使用解构赋值
          const { token } = res.data;
          // // 进行本地储存
          localStorage.setItem("mytoken", token);
          // // 解析token，内部含有用户的认证信息
          const decoded = jwt_decode(token);
          //   token存储到vuex中，作为用户的身份验证信息
          store.dispatch("setAuthenticated", !isEmpty(decoded));
          store.dispatch("setUser", decoded);

          // 登录成功后进行路由跳转
          router.push("/index");
        })
        .catch((err)=>{
          proxy.$message.error("登录失败！");
        })
      }
    });
  } else {
    proxy.$message({
      message: "请正确填写用户名和密码！",
      type: "error",
    });
  }
};
// 判断是否为空的方法
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
</script>

<style scoped>
.login {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  background: url(../../assets/images/login.webp) no-repeat center center;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}

.box {
  transition: all 5s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.7);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
.box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.box .inputBox {
  position: relative;
}

.box .inputBox input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  letter-spacing: 1px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.box .inputBox label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  letter-spacing: 1px;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.box .inputBox input:focus ~ label,
.box .inputBox input:valid ~ label {
  top: -30px;
  left: 0;
  color: #03a9f4;
  font-size: 12px;
}
.box .qiehuan p {
  color: #fff;
  font-size: 13px;
  text-align: center;
}
.box .qiehuan p .a {
  color: rgb(70, 26, 212);
  text-decoration: none;
  font-size: 14px;
}
.box .qiehuan p .a:hover {
  color: red;
}
.box input[type="button"] {
  text-align: center;
  background: transparent;
  margin-top: 5px;
  width: 100%;
  border: none;
  outline: none;
  color: #fff;
  background: #03a9f4;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  letter-spacing: 4px;
}
.box input[type="button"]:hover {
  transition: all 0.3s;
  background: #425761;
}
</style>
