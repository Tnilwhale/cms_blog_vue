<template>
  <el-form ref="defForm" :model="defForm" :rules="rules" label-width="80px">
    <el-form-item>
      <el-upload
          class="avatar-uploader"
          action="string"
          :show-file-list="false"
          :http-request="uploadImg"
          :before-upload="beforeAvatarUpload">
        <img v-if="defForm.avatar" :src="defForm.avatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="账号" prop="userName">
      <el-input v-model="defForm.userName" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="nickName">
      <el-input v-model="defForm.nickName"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="defForm.email"></el-input>
    </el-form-item>
    <el-form-item size="large">
      <el-button type="primary" :loading="loading" @click="submitForm()">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import token from "@/token";
  import {update,upload} from '@/api/user'
  export default {
    name: "Info",
    data(){
      return {
        loading:false,
        defForm: {
          id: '',
          userName: '',
          nickName: '',
          avatar: '',
          email:'',
        },
        rules:{
          userName:[{required: true, message: '必填项不能为空'}],
        },
      }
    },
    created() {
      this.defForm = token.getUser();
    },
    methods:{
      submitForm(){
        this.$refs['defForm'].validate(valid=>{
          if(valid){
            this.loading = true
            update(this.defForm).then(data=>{
              this.loading = false
              this.$message.success(data.msg)
              //将用户的最新信息写入localStorage
              token.setUser(data.data)
              this.defForm = data.data
            }).catch(error=>{
              this.loading = false
              this.$message.error(error)
            })
          }
        })
      },
      uploadImg(param){
          const  formData = new FormData();
          formData.append("file",param.file)
          upload(formData).then(data=>{
            this.defForm.avatar = data.data
          }).catch(error=>{
            this.$message.error(error)
          })
      },
      //上传之前的验证
      beforeAvatarUpload(file){
        const isIMAGE = (file.type === 'image/jpeg') ||  (file.type === 'image/jpg') || (file.type ==='image/png')
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isIMAGE) {
          this.$message.error('上传文件只能是图片格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 2MB!')
        }
        return isIMAGE && isLt2M
      },
    }
  }
</script>

<style scoped>
  .avatar-uploader{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    width:178px;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>