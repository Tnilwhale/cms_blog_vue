<template>
  <div class="whitebg paihang">
    <h2 class="htitle">点击排行</h2>
    <ul>
      <li v-for="(item,index) in articles.slice(0,8)" :key="index">
        <i></i><a href="/">{{item.title}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import articles from "../../data/articles";
  import {getNew} from "../../api/font";
  export default {
    name: "FOrder",
    data(){
      return{
        articles:[]
      }
    },
    mounted(){
      getNew().then(data=>{
        this.articles = data.list
      });
    }
  }
</script>

<style scoped>

</style>