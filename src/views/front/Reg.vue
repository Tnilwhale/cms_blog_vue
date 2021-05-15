<template>
  <div v-title data-title="研真博客">
    <FHeader></FHeader>
    <article>
      <div class="lbox">
        <div class="whitebg bloglist">
          <h2 class="htitle">用户注册</h2>
          <el-form ref="regForm" :model="regForm" :rules="rules" style="margin: auto;width: 600px;" label-width="120px">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="regForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="regForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
              <el-input type="password" v-model="regForm.password2"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="regForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:40%;" :loading="loading" @click="submitForm">提交注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="rbox">
        <div class="whitebg wenzi">
          <router-link to="/login" style="color: blue;">有账户？直接登录</router-link>
        </div>
      </div>
    </article>
    <Footer></Footer>
  </div>
</template>

<script>
  import FHeader from './FHeader'
  import {reg} from '@/api/font'
  export default {
    name: "Reg",
    components:{
      FHeader
    },
    data(){
      // 重复密码验证
      const pwdCheck = async(rule, value, callback) => {
        console.log(value)
        if (value.length < 1) {
          return callback(new Error('确认密码不能为空！'));
        } else if(this.regForm.password != this.regForm.password2){
          return callback(new Error('两次输入密码不一致！'));
        }else{
          callback()
        }
      };
      return{
        regForm:{
          userName:'',
          password:'',
          password2:'',
          email:'',
        },
        loading:false,
        rules:{
          userName:[{required:true,message:'用户名必填项',trigger:'blur'},
            {min:3,max:20, message:'长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          password:[{required:true,message:'密码不能为空',trigger:'blur'},
            {min:6,message:'长度不能低于6个字符', trigger: 'blur'}
          ],
          password2:[{required:true,message:'确认密码不能为空',trigger:'blur'},
            {required:true,validator:pwdCheck}
          ],
          email:[{required:true,message:'邮箱必填项',trigger:'blur'}],
        }
      }
    },
    methods:{
      submitForm(){
        this.$refs.regForm.validate(valid=>{
           if(valid){
             reg(this.regForm).then(res=>{
                this.$message.success(res.msg);
                this.$router.push('/login');
             }).catch(error=>{
               this.$message.error(error);
             })
           }
        })
      }
    }
  }
</script>

<style scoped>

</style>