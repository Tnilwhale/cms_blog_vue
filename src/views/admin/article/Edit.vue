<template>
  <div>
    <el-form ref="defForm" :rules="rules" :model="defForm" label-width="120px">
      <el-form-item label="标题" prop="name">
        <el-input v-model="defForm.title"></el-input>
      </el-form-item>
      <el-form-item label="栏目" prop="channelId">
        <treeselect v-model="defForm.channelId" placeholder="请选择栏目" :multiple="false" :options="treeData" />
      </el-form-item>
      <el-form-item label="栏目图" prop="channelImg">
        <el-upload
            class="avatar-uploader"
            action="string"
            :show-file-list="false"
            :http-request="uploadImg"
            :before-upload="beforeAvatarUpload">
          <img v-if="defForm.titleImg" :src="defForm.titleImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </el-form-item>
      <el-form-item label="摘要" prop="summary">
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="defForm.summary"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="defForm.author"></el-input>
      </el-form-item>
      <el-form-item label="外链" prop="url">
        <el-input v-model="defForm.url"></el-input>
      </el-form-item>

      <el-form-item label="允许评论" prop="commentStatus">
        <el-switch
            v-model="defForm.commentStatus"
            active-color="#13ce66"
            inactive-color="#999999">
        </el-switch>
      </el-form-item>
      <el-form-item label="轮播" prop="rotation">
        <el-switch
            v-model="defForm.rotation"
            active-color="#13ce66"
            inactive-color="#999999">
        </el-switch>
      </el-form-item>
      <el-form-item label="置顶" prop="top">
        <el-switch
            v-model="defForm.top"
            active-color="#13ce66"
            inactive-color="#999999">
        </el-switch>
      </el-form-item>

      <el-form-item label="标签" prop="selectTagList">
        <el-checkbox-group v-model="defForm.selectTagList">
          <el-checkbox  v-for="(item,index) in tagList" :key="index" :label="item.id" >{{item.tagName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="附件" prop="attachmentList">
        <el-upload
            class="upload-demo"
            action="string"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :http-request="uploadImg2"
            :on-exceed="handleExceed"
            :file-list="defForm.attachmentList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
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
  //https://vue-treeselect.js.org
  //https://www.npmjs.com/package/vue-markdown-editor
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import {update,upload,detail} from '@/api/article'
  import {tree} from '@/api/channel'
  import {all} from '@/api/tag'
  export default {
    name: "Add",
    components: { Treeselect },
    data(){
      return {
        tagList: [],
        defForm:{
          id:'',
          title:'',
          channelId:null,
          titleImg:'',
          summary:'',
          commentStatus:true,
          rotation:false,
          url:'',
          author:'',
          top:false,
          content:'',
          attachmentList: [],
          selectTagList:[],
        },
        treeData:[],
        loading:false,
        rules:{
          title:[{required:true,message:'必填项不能为空'}],
          channelId:[{required:true,message:'必填项不能为空'}],
        }
      }
    },

    created() {

      let id = this.$route.query.id
      detail(id).then(data=>{

        this.defForm = data.data
        if(!this.defForm.attachmentList){
          this.defForm.attachmentList= []
        }
        if(!this.defForm.selectTagList){
          this.defForm.selectTagList= []
        }
        if(!data.data.content){
          this.defForm.content=''
        }
        if(this.defForm.commentStatus != 1){
          this.defForm.commentStatus= true
        }
        if(this.defForm.rotation == 1){
          this.defForm.rotation= true
        }
        if(this.defForm.top == 1){
          this.defForm.top= true
        }

      }).catch(error=>{
        this.$message.error(error)
      })

      tree().then(data=>{
        this.treeData = data.data
        console.log(this.treeData)
      }).catch(error=>{
        this.$message.error(error)
      })
      all().then(data =>{
        console.log(data)
        this.tagList = data.data
      }).catch(error=>{
        this.$message.error(error)
      })


    },
    methods:{
      submitForm(form){
        this.$refs['defForm'].validate(valid=>{
          if(valid){
            this.loading = true
            if(this.defForm.commentStatus){
              this.defForm.commentStatus = 0;
            }else{
              this.defForm.commentStatus = 1;
            }
            if(this.defForm.rotation){
              this.defForm.rotation = 1;
            }else{
              this.defForm.rotation = 0;
            }
            if(this.defForm.top){
              this.defForm.top = 1;
            }else{
              this.defForm.top = 0;
            }
            update(this.defForm).then(data=>{
              this.loading = false
              this.$refs['defForm'].resetFields()
              this.$message.success(data.msg)
              this.$router.push("/article")
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
          this.defForm.titleImg = data.data
        }).catch(error=>{
          this.$message.error(error)
        })
      },
      uploadImg2(param){
        const  formData = new FormData();
        formData.append("file",param.file)
        upload(formData).then(data=>{
          this.defForm.attachmentList.push({name:param.file.name,url:data.data})
          console.log(this.defForm.attachmentList)
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
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        fileList.forEach((item,index)=>{
          if(file.name == item.name){
            this.defForm.attachmentList.splice(index,1);
          }
        })
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