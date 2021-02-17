<template>
  <div class="login-page">
    <div class="login-page-bg">
      <h2>cms后台登录</h2>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="userName">
          <el-input aria-placeholder="请输入用户名" v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input aria-placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="onSubmit">立即登录</el-button>
          <el-button>注册</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      form:{
        userName:'',
        password:'',
      }
    }
  }

}
</script>

<style scoped>
.login-page{
  height: 100%;
  background-color: aquamarine;
}
.login-page-bg{
  position: absolute;
  top: 30%;
  left: 35%;
  right: 35%;
  width: 500px;
  bottom: 30%;
  background-color: azure;
  border-radius: 10px;
  padding-top: 20px;
  padding-right: 10px;
  text-align: center;
  color: blueviolet;
}
.login-page-bg h2{
  margin-bottom: 50px;
}
</style>