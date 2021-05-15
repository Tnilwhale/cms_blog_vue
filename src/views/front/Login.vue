<template>
  <div v-title data-title="研真博客">
    <FHeader></FHeader>
    <article>
      <div class="lbox">
        <div class="whitebg bloglist">
          <h2 class="htitle">用户登录</h2>
          <el-form ref="loginForm" :model="loginForm" :rules="rules" style="margin: auto;width: 600px;" label-width="120px">
            <el-form-item label="账号" prop="userName">
              <el-input v-model="loginForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width:40%;" type="primary" :loading="loading" @click="submitForm">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="rbox">
        <div class="whitebg wenzi">
          <router-link to="/login" style="color: blue;">有账户？直接登录</router-link>
        </div>
      </div>
    </article>
    <Footer></Footer>
  </div>
</template>

<script>
  import FHeader from './FHeader'
  export default {
    name: "Reg",
    components:{
      FHeader
    },
    data(){
      return{
        loginForm:{
          userName:'',
          password:'',
        },
        loading:false,
        rules:{
          userName:[{required:true,message:'账号必填项',trigger:'blur'}],
          password:[{required:true,message:'密码不能为空',trigger:'blur'}],
        }
      }
    },
    methods:{
      submitForm(){
        this.$refs.loginForm.validate(valid=>{
           if(valid){
             this.loading = true
             this.$store.dispatch('login',this.loginForm).then(()=>{
               this.$router.push('/')
             }).catch(error=>{
               this.loading = false
               this.$message.error(error)
             })
           }
        })
      }
    }
  }
</script>

<style scoped>

</style>