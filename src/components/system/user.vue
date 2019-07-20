<template>
    <div id="user">
        <div class="btn">
            <el-button type="primary" size="small">新增</el-button>
        </div>
        <el-table

                style="width: 100%">
            <el-table-column
                    prop="username"
                    label="用户名">
            </el-table-column>
            <el-table-column

                    label="角色">
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
        created(){
            this.$http.get(this.$api.findAdmins).then((resp)=>{
                console.log(resp.data.data)
                resp.data.data.forEach((item,index)=>{
                    console.log(item.username)
                })
            });
            this.$http.get(this.$api.findRoles).then((resp)=>{
                console.log(resp.data.data)
            })

        },
        data() {
            return {
                tableData: []
            }
        }
    }
</script>

<style lang="scss" scoped>
    .btn{
        padding-bottom: 20px;
    }
</style>