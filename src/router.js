import Vue from 'vue'
import VueRouter from "vue-router";
import Login from "./views/admin/Login";
import Index from "./views/admin/Index";
import User from "./views/admin/user/Index";
import Tag from "./views/admin/tag/Index";
import Channel from "./views/admin/channel/Index";
import FriendLink from "./views/admin/friendlink/Index";
import Article from "./views/admin/article/Index";
import Comment from "./views/admin/comment/Index";
import Info from "@/views/admin/user/Info";
import token from "@/token";
// import Info from "./views/admin/user/Info";
// import token from "./token";
// import ChannelAdd from "./views/admin/channel/Add";
// import ChannelEdit from "./views/admin/channel/Edit";
// import ArticleAdd from "./views/admin/article/Add";
// import ArticleEdit from "./views/admin/article/Edit";
// import FriendAdd from "./views/admin/friendlink/Add";
// import FriendEdit from "./views/admin/friendlink/Edit";
// import FIndex from './views/front/Index'
// import List from './views/front/List'
// import Detail from './views/front/Detail'
// import ChannelDetail from './views/front/ChannelDetail'
// import TagList from './views/front/TagList'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/index',
      name:'index',
      component:Index,
      children:[
        {
          path:'/info',
          name:'info',
          component:Info
        },
        {
          path:'/user',
          name:'user',
          component:User
        },
        {
          path:'/tag',
          name:'tag',
          component:Tag
        },
        {
          path:'/channel',
          name:'channel',
          component:Channel
        },
        {
          path:'/article',
          name:'article',
          component:Article
        },
        {
          path:'/friendlink',
          name:'friendlink',
          component:FriendLink
        },
        {
          path:'/comment',
          name:'comment',
          component:Comment
        },
      ]
    }
  ]
})
//相当于过滤器里的链
router.beforeEach((to,from,next)=>{
  if(token.getUser()){
    next()
  }else {
    if(to.path === '/login'){
      next()
    }else {
      next('/login')
    }
  }
})

export default router