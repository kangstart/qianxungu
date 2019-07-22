<template>
    <div id="user">
        <div class="btn">
            <el-button type="primary" size="small" @click="addUser">新增</el-button>
        </div>
        <el-table :data="obj" style="width: 100%">
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="roles" label="角色"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button id="btn" type="danger" size="small" @click="open(scope.row,scope.$index)" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "user",
        created() {
            this.loadData()
            // console.log(this.tableData);
        },
        data() {
            return {
                obj: [],
                allRoles: []
            }
        },
        methods: {
            async loadData(){
                var roleNames = []
                //获取所有的用户
                var rs1 = await this.$http.get(this.$api.findAdmins);
                //获取所有的角色
                var rs2 = await this.$http.get(this.$api.findRoles);
                console.log(rs1.data.data);
                this.obj = rs1.data.data;
                console.log(rs2.data.data);
                this.allRoles = rs2.data.data;

                // this.allRoles = rs2.data.data;
                // var length = roleNames.length-1;
                // rs1.data.data.forEach((item)=>{
                //     console.log(item)
                //      for (var i = 0; i <= length; i++) {
                //          console.log(roleNames[i]._id )
                //         // if (roleNames[i]._id == ){
                //         //
                //         // }
                //      }
                // })

                //对obj里面每个用户的角色名进行映射处理
                this.obj.map((item,index)=>{

                    item.roles.map((roleItem,index)=>{
                        const length = this.allRoles.length;
                        console.log(this.allRoles);
                        for (let i = 0; i < length; i++) {
                            if (roleItem === this.allRoles[i]._id) {
                                item.roles[index] = this.allRoles[i].roleName;
                            }
                        }
                    });

                });

                console.log(this.obj);

            },
            addUser() {

            },
            open(row,index) {
                var oBtn = document.getElementById('btn')
                this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        console.log(row);
                        let _id = row._id;
                        console.log(_id);

                        this.$http.post(this.$api.deleteAdmin, { _id: _id }).then(resp => {
                            console.log(resp);
                        })
                        this.loadData()
                        // console.log(this.tableData);

                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            }
        },
        filters:{

        }
    }
</script>

<style lang="scss" scoped>
    .btn {
        padding-bottom: 20px;
    }
</style>