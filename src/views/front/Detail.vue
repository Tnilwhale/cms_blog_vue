<template>
  <div v-title :data-title="article.title">
    <FHeader></FHeader>
    <article>
      <div class="lbox">
        <div class="content_box whitebg">
          <h2 class="htitle"><span class="con_nav">您现在的位置是：<a href="/">网站首页</a>&gt;<a href="/">博客正文</a></span>博客正文</h2>
          <h1 class="con_tilte">{{article.title}}</h1>
          <p class="bloginfo"><i class="avatar"><img src="@/assets/images/avatar.png"></i><span>{{article.author}}</span><span>2018-10-28</span><span></span><span>99人已围观</span></p>
          <p class="con_info" v-if="article.summary"><b>摘要</b>{{article.summary}}</p>
          <div class="con_text">
            <v-md-preview :text="article.content"></v-md-preview>
            <!--<div class="nextinfo">
              <p>上一篇：<a href="/download/f/886.html">html5 个人博客模板《蓝色畅想》</a></p>
              <p>下一篇：<a href="/download/f/907.html">个人博客模板《tree》-响应式个人网站模板</a></p>
            </div>-->
          </div>
        </div>

        <div class="whitebg lanmu">
          <h1>评论</h1>
          <div class="com" v-for="(item,index) in comments" :key="index">
            <p style="float:left;width: 60px;">
              <img v-if="item.user && item.user.avatar" :src="item.user.avatar" class="author">
              <img v-else src="../../assets/images/avatar.png" class="author">
            </p>
            <p style="float:right;width: 760px;">
              <span style="font-size: 12px;">{{item.createDate}}</span>
              <br/>
              {{item.content}}
            </p>
          </div>
          <p>
            <el-form ref="commentForm" :model="commentForm" style="width: 100%;padding: 10px;">
              <el-form-item prop="content" align="left">
                <el-input type="textarea" placeholder="评论输入..." style="font-size: 12px;" rows="4" v-model.trim="commentForm.content"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width:20%;" :loading="loading" @click="submitForm">提交评论</el-button>
              </el-form-item>
            </el-form>
          </p>
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
  import FTag from "./FTag"
  import {getArticle,comment_query} from "../../api/font";
  import {create} from "../../api/comment";
  import token from "../../token";

  export default {
    name: "Index",
    components: {
      FHeader, FOrder, FLike, FriendLink,Footer,FTag
    },
    data(){
      return{
        article:{},
        comments:[],
        loading:false,
        commentForm:{
          content:'',
        },
      }
    },
    created() {
      getArticle(this.$route.params.id).then(data=>{
        this.article = data.data
        this.articleId = this.article.id
      })
      this.query(this.$route.params.id);
    },
    beforeRouteUpdate(to, from, next){
      console.log(to.params)
      next()
    },
    methods:{
      query(articleId){
        comment_query(articleId).then(data=>{
          this.comments = data.data
        })
      },
      submitForm(){
        if(!token.get()){
          this.$message.warning('请先登录')
          return;
        }
        if(this.commentForm.content==''){
          this.$message.warning('评论不能为空')
          return;
        }
        this.loading = true
        this.commentForm.articleId=this.article.id
        create(this.commentForm).then(res=>{
          this.loading = false
          this.$message.success(res.msg)
          this.commentForm.content='';
          this.query(res.data.articleId);
        }).catch(error=>{
          this.loading = false
          console.log(error);
        })
      }
    }
  }
</script>

<style scoped>
.com{
  margin: 10px;
  font-size: 14px;
  padding-bottom: 10px;
  border-bottom: 1px dotted #cccccc;
  display: inline-block;
}
.author{
  border-radius: 20px;
  border: 1px solid #cccccc;
  height: 40px;
  width: 40px;
}
</style>