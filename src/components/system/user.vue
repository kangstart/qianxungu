<template>
    <div id="user">
        <div class="btn">
            <el-button type="primary" size="small" @click="dialogFormVisible=true">新增</el-button>
        </div>

        <el-table :data="obj" style="width: 100%">
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="roles" label="角色昵称"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button id="btn" type="danger" size="small" @click="open(scope.row,scope.$index)" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="新增用户" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="命名昵称" :label-width="formLabelWidth">
                    <el-input v-model="form.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="输入密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色:" :label-width="formLabelWidth">
                    <el-checkbox-group v-model="form.rolename">
                        <el-checkbox v-for="item in allRoles" :label=item.roleName></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser(form.username,form.rolename,form.nickname,form.password)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "user",
        created() {
            this.loadData()
        },
        data() {
            return {
                dialogFormVisible: false,
                obj: [],
                allRoles: [],
                form: {
                    username: '',
                    nickname:'',
                    rolename:[],
                    password:'',
                },
                formLabelWidth: '120px'
            }
        },
        methods: {
            async loadData(){
                //获取所有的用户
                var rs1 = await this.$http.get(this.$api.findAdmins);
                //获取所有的角色
                var rs2 = await this.$http.get(this.$api.findRoles);

                this.obj = rs1.data.data;

                this.allRoles = rs2.data.data;

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
            addUser(username,rolename,nickname,password) {
                this.dialogFormVisible = false;

                for (let j = 0; j < rolename.length; j++){
                    for (let i = 0; i < this.allRoles.length; i++) {
                        console.log("rolename[j]=",rolename[j]);
                        console.log("this.allRoles[i].roleName=",this.allRoles[i].roleName);
                        if (rolename[j] == this.allRoles[i].roleName) {
                            rolename[j] = this.allRoles[i]._id;
                        }
                    }
                }
                var obj ={};
                var arr = [...rolename];
                obj.username = username;
                obj.roles = JSON.stringify(arr);
                obj.nickname = nickname;
                obj.password = password;

                this.$http.post(this.$api.addNewAdmin,{...obj}).then((resp)=>{
                    this.loadData()
                })


            },
            open(row,index) {
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
                            this.loadData()
                        })


                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .btn {
        padding-bottom: 20px;
    }
</style>