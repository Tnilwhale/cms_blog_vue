<template>
  <el-aside width="200px">
    <el-menu
        :unique-opened="true"
        router
        :default-openeds="opens"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
      <template v-for="(menu,index) in menus()">
        <!--index与default-openeds数组中的值保持一致即可默认展开-->
        <el-submenu index="0" :key="index">
          <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{menu.name}}</span>
          </template>
          <template v-for="(child,i) in menu.children">
            <el-menu-item :index="child.route" :key="index+'-'+i">
              <i :class="child.icon"></i>{{child.name}}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>

    </el-menu>
  </el-aside>
</template>

<script>
  import menus1 from '@/api/menu'
  import menus2 from '@/api/menu2'
  import token from "@/token";
  export default {
    name: "Left",
    data(){
      return {
        opens:['0'],
      }
    },
    computed:{

    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      menus(){
        if(token.getUser().type == 1){
          return menus2;
        }else{
          return menus1;
        }
      /*
        menus2.forEach(item=>{
          let arr = item.children;
          item.children = arr.filter(sub=>{
            return sub.type.indexOf(token.getUser().type)>-1;
          });
        })
        console.log(menus2)
        return menus2;*/
      }
    }
  }
</script>

<style scoped>
.el-aside{
  background-color: #ffffff;
  position: absolute;
  left: 0px;
  bottom: 0px;
  top: 60px;
  border-right: 1px solid #e6e6e6;
  box-shadow: 5px 0px 5px -2px #e0e0e0;
}
</style>