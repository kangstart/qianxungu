<template>
    <div>
        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="名称"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="描述"
        >
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
      },
      created () {
        this.$http.post(this.$api)
      }
}
</script>

<style lang="scss" scoped>
  .el-table tr{
    display: flex;
    // justify-content: center;
    align-items: center;
    &>td{
      &:nth-child(1){
        flex: 1
      }
      &:nth-child(2){
        flex: 1
      }
      &:nth-child(3){
        flex: 3
      }
    }
  }
</style>



