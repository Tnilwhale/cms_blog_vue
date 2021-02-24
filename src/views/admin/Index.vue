<template>
  <el-container class="container">
    <el-header class="header">
      <Header></Header>
    </el-header>
    <el-container>
      <Left></Left>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
          <router-view>
          </router-view>
        </el-card>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "../../components/admin/Header";
import Left from "@/components/admin/Left";
export default {
  name: "Index",
  components: {Header,Left},
  comments: {Header},
  methods:{
  }
}
</script>

<style scoped>
.container{
  background-color: #f2f2f2;
  position: absolute;
  bottom: 0px;
  top: 0px;
  right: 0px;
  left: 0px;
}
.header{
  background-color: cornflowerblue;
  width: 100%;
}
.el-main{
  position: absolute;
  top: 60px;
  right: 10px;
  bottom: 0px;
  left: 210px;
}


</style>