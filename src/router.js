import Vue from 'vue'
import VueRouter from "vue-router";
import Test from "@/components/Test";

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {
      path:'/',
      name:'test',
      component:Test
    }
  ]
})

export default router