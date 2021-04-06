<template>
  <div>
    <el-form ref="defForm" :rules="rules" :model="defForm" label-width="120px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="defForm.title"></el-input>
      </el-form-item>

      <el-form-item label="链接" prop="url">
        <el-input v-model="defForm.url"></el-input>
      </el-form-item>

      <el-form-item label="打开方式" prop="target">
        <el-radio v-model="defForm.target" label="_blank">新窗口</el-radio>
        <el-radio v-model="defForm.target" label="_self">当前窗口</el-radio>
      </el-form-item>

      <el-form-item label="图片" prop="channelImg">
        <el-upload
            class="avatar-uploader"
            action="string"
            :show-file-list="false"
            :http-request="uploadImg"
            :before-upload="beforeAvatarUpload">
          <img v-if="defForm.path" :src="defForm.path" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary" @click="$router.back()" >返回</el-button>
        <el-button type="primary" :loading="loading" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {create,upload} from '@/api/friendlink'
  export default {
    name: "Add",
    data(){
      return {
        defForm:{
          title:'',
          url:'',
          target:'_blank',
          path:'',
        },
        loading:false,
        rules:{
          title:[{required:true,message:'必填项不能为空'}],
          url:[{required:true,message:'必填项不能为空'}],
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
              this.$message.success(data.msg)
              this.$router.push('/friend')
            }).catch(error=>{
              this.loading = false
              this.$message.error(error)
            })
          }
        })
      },
      close(){
        this.$emit("hideDialog")
      },
      uploadImg(param){
        const  formData = new FormData();
        formData.append("file",param.file)
        upload(formData).then(data=>{
          this.defForm.path = data.data
        }).catch(error=>{
          this.$message.error(error)
        })
      },
      //上传之前的验证
      beforeAvatarUpload(file){
        const isIMAGE = (file.type === 'images/jpeg') ||  (file.type === 'images/jpg') || (file.type ==='images/png')
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
    width:80px;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>