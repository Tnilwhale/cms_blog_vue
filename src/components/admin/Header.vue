<template>
  <div class="header">
    <el-row>
      <el-col :span="20">
        <table border="0" class="logo">
          <tr>
            <td>
              <img src="../../assets/images/logo.png">
            </td>
            <td>邵小毛的个人博客后台</td>
          </tr>
        </table>
      </el-col>
      <el-col :span="4" align="right">
        <el-dropdown trigger="click" @command="handleCommand" style="margin-top: 20px">
          <el-link class="user" :underline="false">
            <table border="0" >
              <tr>
                <td>
                  <img :src="avatar" >
                </td>
                <td >{{userName}}</td>
                <td valign="middle">
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
  </div>
</template>

<script>
import token from "../../token";

export default {
 name: "Header",
 data(){
   return {
     userName:token.getUser().userName,
     avatar:token.getUser().avatar,
   }
 },
  methods:{
   handleCommand(command){
      if (command == 'info'){
        this.$router.push('/info');
      }
      if (command == 'index'){
        this.$router.push('/index');
      }
     if (command == 'password'){
       this.$router.push('/password');
     }
     if (command == 'logout'){
       //不可直接转login，需清除token
       this.$store.commit('logout')
       this.$router.push('/login');
     }
   }
  }
}
</script>

<style scoped>
.logo{
  height: 60px;
  padding-left: 10px;
  color: azure;
  font-size: 20px;
  font-weight: bold;
}
.logo img{
  width: 45px;
  height: 45px;
}
.user{
  color: azure !important;
  font-size: 14px;
}
.user img{
  width: 30px;
  height: 30px;
  border-radius: 15px;

}
</style>