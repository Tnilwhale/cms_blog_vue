<template>
  <header id="header">
    <div class="navbox">
      <h2 id="mnavh"><span class="navicon"></span></h2>
      <div class="logo"><a href="#">研真博客</a></div>
      <nav>
        <ul id="starlist">
          <li><a href="/">首页</a></li>
          <li v-for="(item,index) in channels" :key="index" :class="{menu:item.children}">
            <router-link v-if="item.single" :to='"/channel_detail/"+item.id'>{{item.name}}</router-link>
            <router-link v-else :to='"/list/"+item.id'>{{item.name}}</router-link>
            <ul class="sub" v-if="item.children">
              <li v-for="(sub,sindex) in item.children" :key="sindex">
                <router-link v-if="sub.single" :to='"/channel_detail/"+sub.id'>{{sub.name}}</router-link>
                <router-link v-else :to='"/list/"+sub.id'>{{sub.name}}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div class="searchico">
        <router-link  to="/index" v-if="loginState">管理中心</router-link>
        <router-link  to="/article_add" v-if="loginState">发帖</router-link>
        <router-link v-if="!loginState" to="/login">登录</router-link>
        <router-link v-if="!loginState" to="/reg">注册</router-link>
      </div>
    </div>
  </header>
</template>

<script>
  import {queryByPos} from "../../api/font"
  import token from "@/token";
  export default {
    name: "FHeader",
    data(){
      return {
        channels:[],
      }
    },
    computed:{
      loginState(){
        if(token.get()){
          return true;
        }else{
          return false;
        }
      },
    },
    mounted() {
      queryByPos('a').then(data=>{
        console.log(data.data)
        this.channels = data.data
      }).catch(error=>{

      })
    },
    methods:{
      command(index){
        if(index == 'logout'){
          //退出登录-->登录页面
          this.$store.commit('logout')
          this.$router.push("/login");
        }
      }
    }
  }
</script>

<style scoped>

</style>