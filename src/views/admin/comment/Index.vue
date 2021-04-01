<template>
  <div>
    <div>
      <el-form :inline="true" ref="queryForm" :model="queryForm">
        <el-form-item>
          <el-input v-model="queryForm.content" placeholder="按关键字查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" @click="search" type="danger">查询</el-button>
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
          prop="author"
          label="评论者">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱">
      </el-table-column>
      <el-table-column
          prop="createDate"
          label="评论时间">
      </el-table-column>
      <el-table-column
          prop="content"
          label="内容">
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态">
      </el-table-column>
      <el-table-column
          align="center"
          width="150px"
          label="操作">
        <template slot-scope="scope">
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
  import {del, query} from "@/api/comment";

  export default {
    name: "Index",
    data() {
      return {
        queryForm:{
          content:'',
        },
        tableData: [],
        total:0,
        pageNo:1,
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
    }
  }
</script>

<style scoped>

</style>