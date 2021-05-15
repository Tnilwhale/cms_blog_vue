<template>
  <div class="login-page">
    <div class="login-page-bg">
      <h2>cms后台登录</h2>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="userName">
          <el-input aria-placeholder="请输入用户名" v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input aria-placeholder="请输入密码" type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" :loading="loading" @click="submit">立即登录</el-button>
<!--          <el-button>注册</el-button>-->
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
        userName:'skx1',
        password:'1',
      },
      loading:false,
      rules:{
        userName: [{required:true,message:'请输入用户名'}],
        password: [{required:true,message:'请输入密码'}]
      },

    }
  },
  methods:{
    submit(){
      this.$refs['form'].validate(valid=>{
        if(valid){
          //执行登录操作
          this.loading = true
          this.$store.dispatch('login',this.form).then(()=>{
            // console.log(data)
            this.$router.push('/index')
          }).catch(error=>{
            this.loading = false
            this.$message.error(error)
          })
          //执行页面跳转

        }
      })
    }
  }

}
</script>

<style scoped>
.login-page{
  height: 100%;
  /*background-color: aquamarine;*/
  background: url("../../assets/images/login_bg.jpg") no-repeat;
  background-size: cover;
}
.login-page-bg{
  position: absolute;
  top: 30%;
  left: 35%;
  right: 35%;
  /*width: 500px;*/
  /*bottom: 30%;*/
  background-color: azure;
  border-radius: 5px;
  padding-top: 10px;
  padding-right: 50px;
  text-align: center;
  color: blueviolet;
  -webkit-box-shadow: #666 0px 0px 10px;
  -moz-box-shadow: #666 0px 0px 10px;
  box-shadow: #666 0px 0px 10px;
}
.login-page-bg h2{
  margin-bottom: 50px;
}
</style>