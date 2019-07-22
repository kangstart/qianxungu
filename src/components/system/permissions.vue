<template>
  <div>
    <el-button type="primary" size="small" class="addPer" @click="isDialog">新增权限</el-button>

    <el-dialog title="新增权限" :visible.sync="visible">
      <el-form :model="form" :rules="rules" ref="form">

        <el-form-item label="权限名称" prop="permissionName">
          <el-input v-model="form.permissionName"></el-input>
        </el-form-item>

        <el-form-item label="权限描述" prop="permissionDesc">
          <el-input v-model="form.permissionDesc"></el-input>
        </el-form-item>

        <el-form-item label="权限等级" prop="permissionLeve">
          <el-select v-model="form.permissionLeve" placeholder="请选择权限等级" @change="changeLeve" :disabled="LeveDisabled">
            <template v-for="item in [1,2,3,4]">
              <el-option :label=item :value=item :key=item ></el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item label="父级权限" prop="parentid">
          <el-select v-model="form.parentid" placeholder="请选择父级权限" :disabled="parentIdDis" @change="changeId">
            <el-option label='无父级' value=0></el-option>   
            <template v-for="item in allPermissions">            
              <el-option :label=item.permissionDesc :value=item._id :key=item._id></el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item class="button">
          <el-button type="primary" @click="submitForm('form')">新增</el-button>
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table :data="allPermissions" style="width: 100%" :tree-props="{children: 'children'}">
      <el-table-column prop="permissionName" label="权限名称"></el-table-column>
      <el-table-column prop="permissionDesc" label="权限描述"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="open(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      LeveDisabled:false,//权限等级状态
      parentIdDis:false,//父级权限状态
      allPermissions: [],//权限列表
      form: {
        permissionName: "",
        permissionDesc: "",
        permissionLeve: "",
        parentid:"",
        
      },//添加权限接口参数
      rules: {
        permissionName: [
          { required: true, message: "请输入权限名称", trigger: "blur" }
        ],
        permissionDesc: [
          { required: true, message: "请输入权限描述", trigger: "blur" }
        ],
        permissionLeve: [
          { required: true, message: "请选择权限等级", trigger: "blur" }
        ],
        parentid:[
          { required: true, message: "请选择父级权限", trigger: "blur" }
        ]
      },//校验规则
      visible: false //弹窗状态
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      let resp = await this.$http.post(this.$api.findPermission);
      // console.log(resp.data.data);
      console.log(this);
      
      this.allPermissions = resp.data.data;
      console.log(this.allPermissions);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.form);

          this.$http.post(this.$api.addNewPermission, this.form).then(resp => {
            console.log("新增结果", resp);
            if (resp.status == 200) {
              this.$message({ message: "新增权限成功", type: "success" });
              this.loadData();
              this.visible = false;
              this.$refs[formName].resetFields();
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
      this.visible = false;
      this.LeveDisabled = false;
      this.parentIdDis = false;
    },
    isDialog() {

      this.visible = true;
    },
    changeLeve(value){
      console.log(value);
      if(value === 1) {
        this.parentIdDis = true;
        this.form.parentid = '0'
      }else {
        this.parentIdDis = false;
      }
    }
    ,
    changeId(value){
      console.log(value);
      if(value === '0'){
        this.LeveDisabled = true;
        this.form.permissionLeve = '1'
      }else {
        this.LeveDisabled = false;
      }
    },
    open(index, row) {
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
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

          this.$http
            .post(this.$api.deletePermission, { _id: _id })
            .then(resp => {
              console.log(resp);
              this.loadData();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },


  }
};
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


</style>



