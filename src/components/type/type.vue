<template>
    <div>
        <el-button size="mini" type="primary" @click="centerDialogVisible = !centerDialogVisible">新增类型</el-button>
        <el-dialog title="编辑文件" :visible.sync="centerDialogVisible" width="50%" center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
        
        <el-form-item label="文件类型" prop="type">
          <el-input
            placeholder="请输入文件类型"
            v-model="ruleForm.type"
            clearable
            style="width:300px;"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </span>
    </el-dialog>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="文件类型" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
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
      editData:{},
      rules: {
        username: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }]
      }
    };
  },
  methods: {
    loadData(){
         this.$http.get(this.$api.findMusicTypes).then(res=>{
          this.tableData = res.data.data
          console.log(res)
      })
    },
    handleDelete(a,b){
        console.log(a,b)
        var id = b._id
        console.log(id)
        let musicList = JSON.stringify([{ _id: id}])
        console.log(musicList)
         this.$http.post(this.$api.deleteMusicType,{musicList:musicList}).then(res => {
        this.loadData();
      });
    },  
    handleOk(){
        console.log(this.ruleForm)
         this.$http.post(this.$api.addNewMusicType, this.ruleForm).then(res => {
              this.centerDialogVisible = false;
              this.loadData();
              console.log(res);
            });
    },
},
created() {
    this.loadData()
},
}
</script>