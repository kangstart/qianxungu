<template>
  <div>
    <el-button type="primary" size="small" class="addPer" @click="isDialog">新增日历图片</el-button>

    <el-dialog title="新增日历图片" :visible.sync="visible" top="8vh">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="日历图片" prop="dailyIMG">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="作者" prop="author">
          <el-input v-model="form.description.author"></el-input>
        </el-form-item>

        <el-form-item label="标题" prop="title">
          <el-input v-model="form.description.title"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.description.content"></el-input>
        </el-form-item>

				<el-form-item label="日期" prop="daily">
          <el-input v-model="form.daily"></el-input>
        </el-form-item>

				<el-form-item class="button">
          <el-button type="primary" @click="submitForm('form')">新增</el-button>
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table :data="allData" style="width: 100%" :tree-props="{children: 'children'}">
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="content" label="图片"></el-table-column>
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
      allData: [],
      visible: true,
      imageUrl: "",
      form: {
				dailyIMG:'',
				liked:0,
				description:{},
				daily:''
			}, //添加权限接口参数
      rules: {
				
				daily: [
          { required: true, message: "请输入日期", trigger: "blur" }
				]
        
      } //校验规则
    };
  },
  methods: {
    isDialog() {
      this.visible = true;
    },
    handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
			this.form.dailyIMG = this.imageUrl
			console.log(this.imageUrl);
			
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
		},
		submitForm(formName){
			this.$refs[formName].validate(valid => {
				if(valid){
					console.log(this.form);
					this.$http.post(this.$api.setDailyBackground,this.form).then(resp=>{
						console.log('新增结果',resp);
						
					})
				}
			})
		},
		resetForm(formName) {
      this.$refs[formName].resetFields();
      this.visible = false;
      this.LeveDisabled = false;
      this.parentIdDis = false;
    }
  }
};
</script>


<style lang="scss" scoped>
.addPer {
  margin-bottom: 20px;
}
.el-form {
  .el-input,.el-textarea {
    width: 50%;
  }
}
.avatar-uploader {
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  margin-right: 110px;
  // text-align: center;
}
.button {
  margin-left: 10px;
}
</style>
