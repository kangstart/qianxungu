<template>
    <div>
        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {
     data() {
        return {
        
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: <el-button type="danger" size="small">删除</el-button>
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },]
        }
      }
}
</script>
