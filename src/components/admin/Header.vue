<template>
  <el-row>
    <el-col :span="20">
      <table border="0" class="logo">
        <tr>
          <td valign="top">
            <img src="../../assets/logo.png" style="margin-top: 5px;">
          </td>
          <td>CMS后台管理系统</td>
        </tr>
      </table>
    </el-col>
    <el-col :span="4" align="right">
      <el-dropdown trigger="click" @command="handleCommand" style="margin-top: 20px">
        <el-link class="user" :underline="false">
          <table border="0">
            <tr>
              <td valign="middle"><img :src="avatar"></td>
              <td valign="top">{{userName}}</td>
              <td valign="top">
                <el-icon class="el-icon-caret-bottom"></el-icon>
              </td>
            </tr>
          </table>
        </el-link>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="index">网站首页</el-dropdown-item>
          <el-dropdown-item command="info">个人信息</el-dropdown-item>
          <el-dropdown-item command="password">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </el-col>
  </el-row>
</template>
<script>
  import token from "../../token";
  export default {
    name: "Header",
    data(){
      return {
        userName:'',
        avatar:'',
      }
    },
    created() {
      if(!token.getUser()){
        this.$router.push('/login')
      }else{
        this.userName=token.getUser().userName
        this.avatar=token.getUser().avatar
      }
    },
    methods:{
      handleCommand(command){
        if(command == 'info'){
          this.$router.push("/info");
        }
        if(command == 'index'){
          this.$router.push("/");
        }
        if(command == 'logout'){
          //退出登录-->登录页面
          let url = "";
          if(token.getUser().type == 1){
            url = "/login";
          }else{
            url="/adminLogin";
          }
          token.clear();
          this.$store.commit('logout')
          this.$router.push(url);
        }
        if(command == 'password'){
          this.$router.push("/password");
        }
      }
    }
  }
</script>
<style scoped>
  .logo {
    height: 60px;
    color: #ffffff;
    font-size: 22px;
    font-weight: bold;
  }

  .logo img {
    width: 40px;
    height: 40px;
  }

  .user {
    color: #ffffff !important;
    font-size: 14px;
  }

  .user img {
    width: 20px;
    height: 20px;
    border-radius: 10px;
  }

</style>