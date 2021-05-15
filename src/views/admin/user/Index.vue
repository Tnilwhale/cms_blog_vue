<template>
  <div>
    <div>
      <el-form :inline="true" ref="queryForm" :model="queryForm">
        <el-form-item>
          <el-input v-model="queryForm.userName" placeholder="按用户名查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryForm.nickName" placeholder="按昵称查询"></el-input>
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
          width="180">
      </el-table-column>
      <el-table-column
          prop="userName"
          label="用户名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="nickName"
          label="昵称">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱">
      </el-table-column>
      <el-table-column
          prop="status"
          width="80px"
          label="状态">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.status=='F'">
            禁用
          </el-tag>
          <el-tag v-else>
            正常
          </el-tag>
        </template>
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

    <el-dialog :visible.sync="addVisible"  v-if="addVisible" :close-on-click-modal="false">
      <Add @after="search" @hideDialog="hidden"></Add>
    </el-dialog>

    <el-dialog :visible.sync="editVisible" v-if="editVisible" :close-on-click-modal="false">
      <Edit @after="search" :data="formData" @hideDialog="hidden"></Edit>
    </el-dialog>

  </div>
</template>

<script>
  import {del, query} from "../../../api/user";
  import Add from './Add'
  import Edit from './Edit'

  export default {
    name: "Index",
    components:{
      Add,Edit
    },
    data() {
      return {
        queryForm:{
          userName:'',
          nickName:'',
        },
        tableData: [],
        formData:{},
        total:0,
        pageNo:1,
        addVisible:false,
        editVisible:false,
      }
    },
    mounted() {
      this.list({"page":this.pageNo})
    },
    methods:{

      handleCurrentChange(val){
        let param = this.queryForm
        this.pageNo = val;
        param.page = this.pageNo
        this.list(param)
      },

      search(){
        let param = this.queryForm
        this.pageNo = 1;
        param.page = this.pageNo
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
        this.addVisible = true
      },
      edit(row){
        this.editVisible = true
        this.formData = row
      },
      hidden(){
        this.addVisible = false
        this.editVisible = false
      },
    }
  }
</script>

<style scoped>

</style>