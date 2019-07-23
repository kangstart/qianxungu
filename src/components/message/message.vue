<template>
  <div>
    <el-form
      :model="numberValidateForm"
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="请留言"
        prop="message"
      >
        <el-input   type="textarea" v-model="numberValidateForm.message" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        numberValidateForm: {
          message: ''
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              if(this.numberValidateForm.message != ''){
              this.numberValidateForm.content = this.numberValidateForm.message
            this.$http.post(this.$api.addNewMessage,this.numberValidateForm).then(res=>{
                console.log(res)
                if(res.data.success){
                    this.$message("留言成功");
                    this.numberValidateForm.message = ''
                }
            })
          } else {
            this.$message("请输入留言");
          }
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>