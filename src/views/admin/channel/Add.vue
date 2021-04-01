<template>
  <div>
    <el-form ref="defForm" :rules="rules" :model="defForm" label-width="120px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="defForm.name"></el-input>
      </el-form-item>
      <el-form-item label="父栏目" prop="parentId">
        <treeselect v-model="defForm.parentId" :multiple="false" placeholder="请选择父栏目" :options="treeData" />
      </el-form-item>
      <el-form-item label="栏目图" prop="channelImg">
        <el-upload
            class="avatar-uploader"
            action="string"
            :show-file-list="false"
            :http-request="uploadImg"
            :before-upload="beforeAvatarUpload">
          <img v-if="defForm.channelImg" :src="defForm.channelImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </el-form-item>
      <el-form-item label="摘要" prop="summary">
        <el-input v-model="defForm.summary"></el-input>
      </el-form-item>

      <el-form-item label="位置" prop="pos">
        <el-select v-model="defForm.pos" placeholder="请选择位置">
          <el-option
              v-for="item in this.posList"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否单页" prop="single">
        <el-switch
            v-model="defForm.single"
            active-color="#13ce66"
            inactive-color="#999999">
        </el-switch>
      </el-form-item>
      <el-form-item label="外链" prop="url">
        <el-input v-model="defForm.url"></el-input>
      </el-form-item>
      <el-form-item label="seo title" prop="seoTitle">
        <el-input v-model="defForm.seoTitle"></el-input>
      </el-form-item>
      <el-form-item label="seo keyword" prop="seoKeyword">
        <el-input v-model="defForm.seoKeyword"></el-input>
      </el-form-item>
      <el-form-item label="seo description" prop="seoDescription">
        <el-input v-model="defForm.seoDescription"></el-input>
      </el-form-item>
      <el-form-item label="content" prop="content">
        <v-md-editor v-model="defForm.content" height="400px"></v-md-editor>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="$router.back()" >返回</el-button>
        <el-button type="primary" :loading="loading" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  //https://vue-treeselect.js.org  npm install --save @riophae/vue-treeselect
  //https://www.npmjs.com/package/vue-markdown-editor  npm i vue-markdown-editor
  //code-farmer-i/vue-markdown-editor npm i @kangc/v-md-editor -S
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import {create,tree,upload} from '@/api/channel'
  export default {
    name: "Add",
    components: { Treeselect },
    data(){
      return {
        defForm:{
          name:'',
          parentId:null,
          channelImg:'',
          summary:'',
          single:false,
          url:'',
          pos:'A',
          seoTitle:'',
          seoKeyword:'',
          seoDescription:'',
          content:'',
        },
        posList:['A','B','C','D','E','F','G'],
        treeData:[],
        loading:false,
        rules:{
          userName:[{required:true,message:'必填项不能为空'}],
          password:[{required:true,message:'必填项不能为空'}],
        }
      }
    },

    created() {
      tree().then(data=>{
        this.treeData = data.data
        console.log(this.treeData)
       }).catch(error=>{

       })
    },
    methods:{
      submitForm(form){
        this.$refs['defForm'].validate(valid=>{
          if(valid){
            this.loading = true
            if(this.defForm.single){
              this.defForm.single = 'Y';
            }else{
              this.defForm.single = 'N';
            }
            create(this.defForm).then(data=>{
              this.loading = false
              this.$refs['defForm'].resetFields()
              this.$message.success(data.msg)
              this.$router.push('/channel')
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
          this.defForm.channelImg = data.data
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