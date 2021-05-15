// import Vue from 'vue'
// import VueRouter from "vue-router";
// import Login from "./views/admin/Login";
// import Index from "./views/admin/Index";
// import User from "./views/admin/user/Index";
// import Tag from "./views/admin/tag/Index";
// import Channel from "./views/admin/channel/Index";
// import FriendLink from "./views/admin/friendlink/Index";
// import Article from "./views/admin/article/Index";
// import Comment from "./views/admin/comment/Index";
// import Info from "@/views/admin/user/Info";
// import token from "@/token";
// import ChannelAdd from "@/views/admin/channel/Add";
// import ChannelEdit from "@/views/admin/channel/Edit";
// import ArticleAdd from "./views/admin/article/Add";
// import ArticleEdit from "./views/admin/article/Edit";
// import FriendAdd from "./views/admin/friendlink/Add";
// import FriendEdit from "./views/admin/friendlink/Edit";
// import FIndex from './views/front/Index'
// import List from './views/front/List'
// import Detail from './views/front/Detail'
// import ChannelDetail from './views/front/ChannelDetail'
// import TagList from './views/front/TagList'
//
// Vue.use(VueRouter)
//
// const router = new VueRouter({
//   routes:[
//     {
//       path:'/',
//       name:'fIndex',
//       component:FIndex,
//       meta:{
//         requireLogin:false
//       }
//     },
//     {
//       path:'/list/:id',
//       name:'list',
//       component:List,
//       meta:{
//         requireLogin:false
//       }
//     },
//     {
//       path:'/detail/:id',
//       name:'detail',
//       component:Detail,
//       meta:{
//         requireLogin:false
//       }
//     }
//     ,{
//       path:'/channel_detail/:id',
//       name:'channel_detail',
//       component:ChannelDetail,
//       meta:{
//         requireLogin:false
//       }
//     },{
//       path:'/tag_list/:id',
//       name:'tag_list',
//       component:TagList,
//       meta:{
//         requireLogin:false
//       }
//     },
//     {
//       path:'/login',
//       name:'login',
//       component:Login
//     },
//     {
//       path:'/index',
//       name:'index',
//       component:Index,
//       children:[
//         {
//           path:'/info',
//           name:'info',
//           component:Info
//         },
//         {
//           path:'/user',
//           name:'user',
//           component:User
//         },
//         {
//           path:'/tag',
//           name:'tag',
//           component:Tag
//         },
//         {
//           path:'/channel',
//           name:'channel',
//           component:Channel
//         },
//         {
//           path:'/channel_add',
//           name:'channel_add',
//           component:ChannelAdd
//         },
//         {
//           path:'/channel_edit',
//           name:'channel_edit',
//           component:ChannelEdit
//         },
//         {
//           path:'/article',
//           name:'article',
//           component:Article
//         },
//         {
//           path:'/article_add',
//           name:'article_add',
//           component:ArticleAdd
//         },
//         {
//           path:'/article_dit',
//           name:'article_edit',
//           component:ArticleEdit
//         },
//
//         {
//           path:'/friendlink',
//           name:'friendlink',
//           component:FriendLink
//         },
//         {
//           path:'/friend_add',
//           name:'friend_add',
//           component:FriendAdd
//         },
//         {
//           path:'/friend_edit',
//           name:'friend_edit',
//           component:FriendEdit
//         },
//         {
//           path:'/comment',
//           name:'comment',
//           component:Comment
//         },
//       ]
//     }
//   ]
// })
// //相当于过滤器里的链
// router.beforeEach((to,from,next)=>{
//   if(!to.matched.some(r=>r.meta.requireLogin)){
//     next();
//   }else{
//     if(token.get()){
//       next()
//     }else{
//       if(to.path === '/login'){
//         next()
//       }else{
//         next('/login')
//       }
//     }
//   }
// })
//
// export default router

import Vue from 'vue'
import VueRouter from "vue-router";
import Login from "./views/front/Login";
import AdminLogin from "./views/admin/Login";
import Index from "./views/admin/Index";
import User from "./views/admin/user/Index";
import Tag from "./views/admin/tag/Index";
import Channel from "./views/admin/channel/Index";
import FriendLink from "./views/admin/friendlink/Index";
import Article from "./views/admin/article/Index";
import Comment from "./views/admin/comment/Index";
import Info from "./views/admin/user/Info";
import token from "./token";
import ChannelAdd from "./views/admin/channel/Add";
import ChannelEdit from "./views/admin/channel/Edit";
import ArticleAdd from "./views/admin/article/Add";
import ArticleEdit from "./views/admin/article/Edit";

import FriendAdd from "./views/admin/friendlink/Add";
import FriendEdit from "./views/admin/friendlink/Edit";
import FIndex from './views/front/Index'
import List from './views/front/List'
import Detail from './views/front/Detail'
import ChannelDetail from './views/front/ChannelDetail'
import TagList from './views/front/TagList'
import Reg from "./views/front/Reg";


Vue.use(VueRouter)

const constantRouterMap = [{
  path:'/',
  name:'fIndex',
  component:FIndex,
  meta:{
    requireLogin:false
  }
},
  {
    path:'/list/:id',
    name:'list',
    component:List,
    meta:{
      requireLogin:false
    }
  },
  {
    path:'/detail/:id',
    name:'detail',
    component:Detail,
    meta:{
      requireLogin:false
    }
  }
  ,{
    path:'/channel_detail/:id',
    name:'channel_detail',
    component:ChannelDetail,
    meta:{
      requireLogin:false
    }
  },{
    path:'/tag_list/:id',
    name:'tag_list',
    component:TagList,
    meta:{
      requireLogin:false
    }
  },
  {
    path:'/reg',
    name:'reg',
    component:Reg,
    meta:{
      requireLogin:false
    }
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/adminLogin',
    name:'adminLogin',
    component:AdminLogin
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
      },{
        path:'/channel',
        name:'channel',
        component:Channel
      },{
        path:'/channel_add',
        name:'channel_add',
        component:ChannelAdd
      },{
        path:'/channel_edit',
        name:'channel_edit',
        component:ChannelEdit
      },{
        path:'/tag',
        name:'tag',
        component:Tag
      },{
        path:'/article',
        name:'article',
        component:Article
      },{
        path:'/article_add',
        name:'article_add',
        component:ArticleAdd
      },{
        path:'/article_edit',
        name:'article_edit',
        component:ArticleEdit
      },{
        path:'/comment',
        name:'comment',
        component:Comment
      },{
        path:'/friend',
        name:'friend',
        component:FriendLink
      },{
        path:'/friend_add',
        name:'friend_add',
        component:FriendAdd
      },{
        path:'/friend_edit',
        name:'friend_edit',
        component:FriendEdit
      }
    ]
  }];


const createRouter = ()=> new VueRouter({
  routes:constantRouterMap
})
const  router = createRouter();
export default router

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

router.beforeEach((to, from, next) => {
  if(!to.matched.some(r=>r.meta.requireLogin)){
    next();
  }else{
    if(token.get()){
      next()
    }else{
      if(to.path === '/login'){
        next()
      }else{
        next('/login')
      }
    }
  }
})