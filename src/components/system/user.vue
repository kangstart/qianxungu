<template>
    <div id="user">
        <div class="btn">
            <el-button type="primary" size="small">新增</el-button>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="400">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="400">
            </el-table-column>
            <el-table-column
                    label="操作">
                <el-button type="danger" size="small">删除</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "user",

        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                }]
            }
        }
    }
</script>

<style lang="scss" scoped>
    #user{
        height: 100%;
        width: 100%;
        .btn{
            padding: 10px;
            box-sizing: border-box;
        }
    }
</style>