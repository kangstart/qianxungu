<template>
  <div class="login">
    <div class="left">
    <div class="head">天音谷</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="ruleForm.username" clearable style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="password">
          <el-input
          clearable style="width:300px;margin-left:10px"
            placeholder="请输入密码"
            v-model="ruleForm.password"
            show-password
            
          ></el-input>
        </el-form-item>
        <div class="box">
       <el-input placeholder="请输入验证码" 
        clearable style="width:230px;margin-left:66px;" v-model='codedata'>
       </el-input >
       <div style="width:70px;height:38px;font-size:16px;background:white;white-space:wrap;color:#888;text-align:center;line-height:19px;" 
       @click="getcode" v-html="checkcode"></div>
        </div><br/><br/>
        <el-button @click="submitForm">登录</el-button>
      </el-form>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
      checkcode:'点击获取验证码',
      checktext:'',
      codedata:'',
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "内容不能为空", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "内容不能为空", trigger: "blur" },
        { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur"}]
      }
    };
  },
  methods: {
      getcode(){
        this.$http.get(this.$api.checkDynamicCode).then(res=>{
         this.checkcode = res.data.data.data
         this.checktext = res.data.data.text
         console.log(this.checktext)
       })
      },
     submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        console.log(this.codedata)
        console.log(this.checktext)
        if(this.codedata == this.checktext){
        if (valid) {
          this.$http.post(this.$api.signin, this.ruleForm).then(res => {
            console.log(res);
            if (res.data.success) {
              var token = res.data.token;
              var username = res.config.data.username;
              localStorage.setItem("token", token);
              localStorage.setItem("username", username);
              console.log(this.$route.params.redname);
              this.$router.push({
                name: this.$route.params.redname
                  ? this.$route.params.redname
                  : "home"
              });
            } else {
              this.$message.error("用户名或者密码错误");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }}else{
           this.$message('验证码错误');
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../assets/xia.jpg");
  background-size: cover;
  display: flex;
  .left {
    min-width: 500px;
    flex: 2;
    text-align: center;
    margin-top: 100px;
    margin-left: 30px;
    .head{
      margin-bottom: 40px;
      font-family: 'Courier New', Courier, monospace;
      font-size:80px;
    }
    .box{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .right {
    flex: 4;
  }
}
</style>
