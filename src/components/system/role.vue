<template>
  <div>
    <el-button size="mini" type="primary" @click="setCheckedKeys">新增角色</el-button>
    <el-dialog title="新增角色" :visible.sync="centerDialogVisible" width="50%" center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            placeholder="请输入角色名称"
            v-model="ruleForm.roleName"
            clearable
            style="width:300px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input
            placeholder="请输入角色描述"
            v-model="ruleForm.roleDesc"
            clearable
            style="width:300px;"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-tree
        :data="data"
        show-checkbox
        node-key="_id"
        ref="tree"
        :props="defaultProps"
        @check="getChecked"
        :default-checked-keys="defaultkey"
        :default-expand-all=false
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </span>
    </el-dialog>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="角色名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色描述">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.roleDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(this, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      centerDialogVisible: false,
      ruleForm: {},
      data: [],
      isAddNew: true,
      defaultkey: [],
      editData:{},
      defaultProps: {
        children: "children",
        label: "permissionDesc",
        permissions: []
      },
      rules: {
        username: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }]
      }
    };
  },
  methods: {
    setCheckedKeys() {
       this.ruleForm = {};
      this.centerDialogVisible = !this.centerDialogVisible;
      this.isAddNew = true;
        this.$refs.tree.setCheckedKeys([]);
      },
    getChecked(a, b) {
      console.log("getchecked", a, b);
      this.permissions = JSON.stringify(b.checkedKeys);
      this.ruleForm.permissions = this.permissions;
    },
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.isAddNew) {
            console.log("handleok-if");
            console.log(this.ruleForm);
            this.$http.post(this.$api.addNewRole, this.ruleForm).then(res => {
               console.log(res)
              this.loadData();
              this.centerDialogVisible = false;
            });
          } else {
            console.log("handleok---else");
            console.log(this.ruleForm);
            this.$http.post(this.$api.updateRole, this.ruleForm).then(res => {
              this.centerDialogVisible = false;
              this.loadData();
              console.log(res);
            });
          }
        }
      });
    },
    handleEdit(index, row) {
      console.log("handleedit");
      this.ruleForm = {...row}
      this.ruleForm._id = this.ruleForm._id;
      this.defaultkey = this.ruleForm.permissions;
      this.ruleForm.permissions = JSON.stringify(this.ruleForm.permissions);
      this.centerDialogVisible = true;
      console.log(this.ruleForm);
      this.isAddNew = false;
    },
    handleDelete(index, row) {
      this.$http.post(this.$api.deleteRole, { _id: row._id }).then(res => {
        this.loadData();
      });
    },
    loadData() {
      this.$http.get(this.$api.findRoles).then(res => {
        this.tableData = res.data.data;
      });
    }
  },
  created() {
    this.loadData();
    this.$http.post(this.$api.findPermission).then(res => {
      this.data = this.toTree(res.data.data);
    });
  }
};
</script>