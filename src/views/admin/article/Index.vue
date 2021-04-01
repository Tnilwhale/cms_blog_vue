<template>
  <div>
    <div>
      <el-form :inline="true" ref="queryForm" :model="queryForm">
        <el-form-item>
          <el-input v-model="queryForm.title" placeholder="按标题查询"></el-input>
        </el-form-item>
        <el-form-item style="width: 200px">
          <treeselect v-model="queryForm.channelId" :multiple="false" placeholder="请选择栏目" :options="treeData" />
        </el-form-item>
        <el-form-item>
          <el-checkbox label="置顶" v-model="queryForm.top"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox label="轮播" v-model="queryForm.rotation"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" @click="search" type="danger">查询</el-button>
          <el-button icon="el-icon-plus" @click="add" type="primary">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="id"
          label="ID"
          width="90px">
      </el-table-column>
      <el-table-column
          prop="title"
          label="标题">
        <template slot-scope="scope">
          <router-link style="color: blue;" target="_blank" :to='"/detail/"+scope.row.id'>
            {{scope.row.title}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
          prop="channelId"
          width="130px"
          label="栏目">
        <template slot-scope="scope">
          <span v-if="scope.row.channel">
            {{scope.row.channel.name}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
          prop="author"
          width="90px"
          label="作者">
        <template slot-scope="scope">
          <span v-if="scope.row.author">{{scope.row.author}}</span>
          <span v-else>匿名</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="rotation"
          width="60px"
          label="轮播">
        <template slot-scope="scope">
          <span v-if="scope.row.rotation==1">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="top"
          width="60px"
          label="置顶">
        <template slot-scope="scope">
          <span v-if="scope.row.top==1">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="status"
          width="90px"
          label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status==1">已发布</el-tag>
          <el-tag type="danger" v-else>待发布</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="createDate"
          width="100px"
          label="发布时间">
      </el-table-column>
      <el-table-column
          align="center"
          width="150px"
          label="操作">
        <template slot-scope="scope">
          <el-link @click="edit(scope.row)" :underline="false" type="primary" class="el-icon-edit-outline">编辑</el-link>
          <el-link @click="del(scope.row)" :underline="false" type="danger" class="el-icon-delete">删除</el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        background
        layout="total,prev, pager, next,jumper"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :total="total">
    </el-pagination>

  </div>
</template>

<script>
  import {tree} from '@/api/channel'
  import {del, query} from "@/api/article";
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    name: "Index",
    components:{
      Treeselect
    },
    data() {
      return {
        queryForm:{
          title:'',
          channelId:null,
          top:0,
          rotation:0,
        },
        tableData: [],
        treeData:[],
        /*formData:{},*/
        total:0,
        pageNo:1,
        /*addVisible:false,
        editVisible:false,*/
      }
    },
    mounted() {
      this.list({"page":this.pageNo})
      tree().then(data=>{
        this.treeData = data.data
        console.log(this.treeData)
      }).catch(error=>{

      })
    },
    methods:{

      handleCurrentChange(val){
        let param = this.queryForm
        this.pageNo = val;
        param.page = this.pageNo
        this.list(param)
      },

      search(){
        let param = {};
        if(this.queryForm.title){
          param.title = this.queryForm.title;
        }
        if(this.queryForm.channelId){
          param.channelId = this.queryForm.channelId;
        }
        this.pageNo = 1;
        param.page = this.pageNo
        if(this.queryForm.top){
          param.top=1
        }
        if(this.queryForm.rotation){
          param.rotation=1
        }

        this.list(param)
      },

      list(param){
        query(param).then(data=>{
            this.tableData = data.list
            this.total = data.total
        }).catch(error=>{
          this.$message.error(error)
        })
      },
      del(row){
        this.$confirm('确定要删除吗？',"提示").then(()=>{
          del(row.id).then(data=>{
            console.log(data)
            let param = this.queryForm
            param.page = this.pageNo
            this.list(param)
            //this.$message.success(data.msg)
          }).catch(error=>{
            console.log(error)
            this.$message.error(error)
          })
        }).catch(error=>{

        })
      },
      add(){
        this.$router.push('/article_add')
      },
      edit(row){
        this.$router.push({
          path:'/article_edit',
          query:{
            id:row.id
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>