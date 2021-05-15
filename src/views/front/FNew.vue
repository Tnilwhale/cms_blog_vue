<template>
  <div class="whitebg bloglist">
    <h2 class="htitle">最新博文</h2>
    <ul>
      <!--多图模式 置顶设计-->
      <li v-for="(item,index) in tops" :key="index-2">
        <h3 class="blogtitle"><router-link :to='"/detail/"+item.id' target="_blank"><b>【顶】</b>{{item.title}}</router-link></h3>
        <span class="blogpic imgscale">
          <i><router-link :to='"/detail/"+item.id' target="_blank">原创模板</router-link>
        </i>
          <router-link :to='"/detail/"+item.id' target="_blank">
          <img v-if="item.titleImg" :src="item.titleImg" alt="">
          <img v-else src="@/assets/images/b01.jpg" alt="">
        </router-link>
        </span>
        <p class="blogtext">{{item.summary}}</p>
        <p class="bloginfo"><i class="avatar"><img src="@/assets/images/avatar.png"></i><span>{{item.author}}</span><span>{{item.createDate}}</span></p>
        <router-link :to='"/detail/"+item.id' class="viewmore" target="_blank">阅读更多</router-link>
      </li>
      <!--单图-->
      <li v-for="(item,index) in articles" :key="index">
        <h3 class="blogtitle"><router-link :to='"/detail/"+item.id' target="_blank">{{item.title}}</router-link></h3>
        <span class="blogpic imgscale">
          <i><router-link :to='"/detail/"+item.id' target="_blank">原创模板</router-link>
        </i>
          <router-link :to='"/detail/"+item.id' target="_blank">
          <img v-if="item.titleImg" :src="item.titleImg" alt="">
          <img v-else src="@/assets/images/b01.jpg" alt="">
        </router-link>
        </span>
        <p class="blogtext">{{item.summary}}</p>
        <p class="bloginfo"><i class="avatar"><img src="@/assets/images/avatar.png"></i><span>{{item.author}}</span><span>{{item.createDate}}</span></p>
        <router-link :to='"/detail/"+item.id' class="viewmore" target="_blank">阅读更多</router-link>
      </li>
    </ul>
    <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="page"
        layout="prev, pager, next, total"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import {getNewList, getUp} from "@/api/font"
  export default {
    name: "FNew",
    data(){
      return{
        tops:[],
        page:1,
        articles:[],
        total:0,
      }
    },
    mounted() {
      getUp().then(data=>{
        this.tops = data.list
      })
      this.getList({page:this.page});
      window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods:{
      handleCurrentChange(val) {
        this.page = val;
        this.getList({page:this.page})
        this.backTop();
      },
      getList(param){
        getNewList(param).then(data=>{
          this.articles = data.list
          this.total = data.total
        });
      },
      // 点击图片回到顶部方法，加计时器是为了过渡顺滑
      backTop () {
        const that = this
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      },
      // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
      scrollToTop () {
        const that = this
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scrollTop
        if (that.scrollTop > 60) {
          that.btnFlag = true
        } else {
          that.btnFlag = false
        }
      }
    }
  }
</script>

<style scoped>

</style>