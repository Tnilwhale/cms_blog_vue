<template>
  <div v-title data-title="栏目频道--研真教育">
    <FHeader></FHeader>
    <article>
      <div class="lbox">
        <FChannelInfo :channel="channel"></FChannelInfo>
        <div class="whitebg bloglist">
          <h2 class="htitle">最新博文</h2>
          <ul>
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
      </div>
      <div class="rbox">
        <FOrder></FOrder>
        <FLike></FLike>
        <FTag></FTag>
        <FriendLink></FriendLink>
      </div>
    </article>
    <Footer></Footer>
  </div>
</template>

<script>
  import '@/assets/css/base.css'
  import '@/assets/css/m.css'
  import FHeader from "./FHeader"
  import FOrder from "./FOrder"
  import FLike from "./FLike"
  import FriendLink from "./FriendLink"
  import Footer from "./Footer"
  import FChannelInfo from "./FChannelInfo";
  import FTag from "./FTag";
  import {get, getArticlesByChannelId2} from "../../api/font";
  export default {
    name: "Index",
    data(){
      return{
        channel:{},
        page:1,
        articles:[],
        total:0,
      }
    },
    components: {
      FHeader,FOrder, FLike, FriendLink,Footer,FChannelInfo,FTag
    },
    mounted() {
      this.getChannel(this.$route.params.id)
      this.getArticlesByCId({page:this.page,channelId:this.$route.params.id})
    },
    beforeRouteUpdate(to, from, next){
      this.getChannel(to.params.id)
      this.getArticlesByCId({page:this.page,channelId:to.params.id})
      next()
    },
    methods:{
      handleCurrentChange(val) {
        this.page = val;
        this.getArticlesByCId({page:this.page,channelId:this.channel.id})
        this.backTop();
      },
      getChannel(id){
        get(id).then(data=>{
          this.channel = data.data;
          console.log(this.channel)
        })
      },
      getArticlesByCId(param){
        getArticlesByChannelId2(param).then(data=>{
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