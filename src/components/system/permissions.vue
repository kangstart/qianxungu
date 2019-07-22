<template>
  <div>
    <el-button type="primary" size="small" class="addPer" @click="isDialog">新增权限</el-button>

    <el-dialog title="新增权限" :visible.sync=visible>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="权限名称" prop="permissionName">
          <el-input v-model="form.permissionName"></el-input>
        </el-form-item>

        <el-form-item label="权限描述" prop="permissionDesc">
          <el-input v-model="form.permissionDesc"></el-input>
        </el-form-item>

        <el-form-item label="活动区域" prop="permissionLeve">
          <el-select v-model="form.permissionLeve" placeholder="请选择权限等级">
            <template v-for="item in [1,2,3,4]">
              <el-option :label="item" :value="item"></el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item class="button">
          <el-button type="primary" @click="submitForm('form')">新增</el-button>
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="permissionName" label="权限名称"></el-table-column>
      <el-table-column prop="permissionDesc" label="权限描述"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small"  @click="deleteItem(scope.$index, scope.row)">删除</el-button>
        </template>
      
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tableData: [],
      form: {
        permissionName: "",
        permissionDesc: "",
        permissionLeve: ""
      },
      rules: {
        permissionName: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
        permissionDesc: [{ required: true, message: "请输入权限描述", trigger: "blur" }],
        permissionLeve: [{ required: true, message: "请输入权限等级", trigger: "blur" }]
      },
      visible:false
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      let resp = await this.$http.post(this.$api.findPermission);
      // console.log(resp.data.data);
      let allPermissions = resp.data.data;
      this.tableData = allPermissions;
      console.log(allPermissions);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.form);
          
          this.$http.post(this.$api.addNewPermission, this.form).then(resp => {
            console.log("新增结果", resp);
            if (resp.status==200) {
              this.$message({message: "新增权限成功",type: "success"});
              this.loadData();
              this.visible=false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.visible=false;
    },
    isDialog(){
      console.log('1');
      
      this.visible=true
    },
    deleteItem(index, row){
      console.log(row);
      let _id = row._id;
      console.log(_id);
      
      this.$http.post(this.$api.deletePermission,{_id:_id}).then((resp)=>{
        console.log(resp);
        this.loadData()
        
      })
    }
  },
      
created () {
        this.$http.post(this.$api)
      }
}
</script>

<style lang="scss" scoped>
.addPer {
  margin-bottom: 20px;
}
.el-form {
  .el-input {
    width: 50%;
  }
}
.button {
  margin-left: 10px;
}

// .el-table tr {
//   display: flex;
//   // justify-content: center;
//   align-items: center;
//   & > td {
//     &:nth-child(1) {
//       flex: 1;
//     }
//     &:nth-child(2) {
//       flex: 1;
//     }
//     &:nth-child(3) {
//       flex: 3;
//     }
//   }
// }
</style>



