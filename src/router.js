import Vue from 'vue'
import VueRouter from "vue-router";
import Login from "@/views/admin/Login";
import Index from "@/views/admin/Index";


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
      component:Index
    }
  ]
})

export default router