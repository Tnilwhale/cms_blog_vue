<template>
  <div>
    <div>
      <el-form :inline="true" :model="queryForm" class="queryForm">
        <el-form-item>
          <el-input v-model="queryForm.userName" placeholder="按用户名查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryForm.nickName" placeholder="按昵称查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" @click="search" type="danger">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" type="primary">新增</el-button>
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
          label="昵称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱"
          width="180">
      </el-table-column>
      <el-table-column
          prop="createDate"
          label="创建时间"
          width="180">
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
          <el-link :underline="false" type="primary" class="el-icon-edit-outline">编辑</el-link>
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

import {del, query} from "../../../api/user";

export default {
  name: "Index",
  data() {
    return {
      tableData: [
        // {
        //   date: '2021-02-20',
        //   name: '邵小毛',
        //   address: '安徽省铜陵市'
        // },
      ],
      queryForm: {
        userName: '',
        nickName: '',
      },
      total:0,
      pageNo:1
    }
  },
  mounted(){
    this.list({"page":this.pageNo})
  },
  methods:{
    handleCurrentChange(val){
      let param = this.queryForm;
      this.pageNo = val;
      param.page = this.pageNo;
      this.list(param)
    },
    search(){
      let param = this.queryForm;
      this.pageNo = 1;
      param.page=this.pageNo;
      this.list(param);

    },
    list(param){
      query(param).then(data=>{
        // console.log(data)
        this.tableData = data.list
        this.total = data.total
      }).catch(error=>{
        this.$message.error(error);
      })
    },
    del(row){
        this.$confirm("确定要删除么？","提示").then(()=>{
          del(row.id).then(data=>{
            this.$message.success(data.msg)
            let param = this.queryForm;
            param.page=this.pageNo;
            this.list(param);
          }).catch(error=>{
            this.$message.error(error)
          })
        }).catch(error=>{

        })
    }
  }
}
</script>

<style scoped>

</style>