<template>
  <div>
    <el-form ref="defForm" :rules="rules" :model="defForm" label-width="80px">
      <el-form-item label="账号" prop="userName">
        <el-input v-model="defForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="defForm.password"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="defForm.nickName"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="defForm.email"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="defForm.status" placeholder="请选择状态">
          <el-option
           v-for="item in this.utils.status"
           :key="item.value"
           :label="item.label"
           :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary" @click="close" >取消</el-button>
        <el-button type="primary" :loading="loading" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {create} from '@/api/user'
  export default {
    name: "Add",
    data(){
      return {
        defForm:{
          userName:'',
          password:'',
          nickName:'',
          email:'',
          status:'T',
        },
        loading:false,
        rules:{
          userName:[{required:true,message:'必填项不能为空'}],
          password:[{required:true,message:'必填项不能为空'}],
        }
      }
    },
    methods:{
      submitForm(form){
        this.$refs['defForm'].validate(valid=>{
          if(valid){
            this.loading = true
            create(this.defForm).then(data=>{
              this.loading = false
              this.$refs['defForm'].resetFields()
              this.$emit("after")
              this.$emit("hideDialog")
            }).catch(error=>{
              this.loading = false
              this.$message.error(error)
            })
          }
        })
      },
      close(){
        this.$emit("hideDialog")
      }
    }
  }
</script>

<style scoped>

</style>