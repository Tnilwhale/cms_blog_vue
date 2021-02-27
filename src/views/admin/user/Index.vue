<template>
  <div>
    <div>
      <el-form :inline="true" :model="queryForm" class="queryForm">
        <el-form-item>
          <el-input v-model="queryForm.name" placeholder="按姓名查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="danger">查询</el-button>
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
          prop="date"
          label="日期"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址">
      </el-table-column>
      <el-table-column
          align="center"
          width="150px"
          label="操作">
        <template>
          <el-link :underline="false" type="primary" class="el-icon-edit-outline">编辑</el-link>
          <el-link :underline="false" type="danger" class="el-icon-delete">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="total,prev, pager, next,jumper"
        :total="1000">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      tableData: [
        {
          date: '2021-02-20',
          name: '邵小毛',
          address: '安徽省铜陵市'
        },
      ],
      queryForm:{
        name:''
      }
    }
  }
}
</script>

<style scoped>

</style>