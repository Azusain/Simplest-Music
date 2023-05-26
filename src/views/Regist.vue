<template>
  <div class="page">
    <div class="total">
      <div class="ButtonNull">
          <el-row>
            <el-button type="primary" class="possess" @click="jumpto()">已有账号，直接登录</el-button>
          </el-row>
      </div>
      <div class="content" >
        <h5>注册账号</h5>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="userName">
            <el-input type="id" v-model="ruleForm.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phoneNumber">
            <el-input v-model.number="ruleForm.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model.number="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="个性签名" prop="signature">
            <el-input type="signature" v-model="ruleForm.signature" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">点击注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { UserRegist} from "../api";

    export default {
      name: "Regist",
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm.checkPassword !== '') {
              this.$refs.ruleForm.validateField('checkPassword');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          ruleForm: {
            userId:'',
            userName:'',
            password: '',
            checkPassword:'',
            userType:'',
            phoneNumber: '',
            email:'',
            headPhoto:'',
            signature:''
          },
          rules: {
            userName: [
              { required:true, trigger:'blur',message:'请输入用户名' }
            ],
            password: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPassword: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            phoneNumber: [
              {required:true, trigger:'blur',message:'请输入电话号码' }
            ],
            email: [
              { required:true, trigger:'blur',message:'请输入邮箱'}
            ],
            signature:[
              { required:true, trigger:'blur',message:'请输入个性签名'}
            ]
          }
        };
      },
      methods: {
        submitForm() {
          this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              UserRegist(this.ruleForm).then(()=> {
                alert('注册成功！')
              })
            }
          })
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        jumpto(){
          this.$router.push('/login')
        }
      }

    }
</script>

<style scoped>

  .page{
    background-image:url(login.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    position : absolute;
    width : 100%;
    height : 100%;
  }
  .el-input{
    width:200px
  }
  h5{
    margin-left: 130px;
    font-size: 20px;
    margin-top: 20px;
    display: block;
  }
  .total{
    height: 520px;
    margin-top: 100px;
    width: 800px;
    border-radius: 20px;
    margin-left: 350px;
    box-shadow: 1px 2px 11px 2px #333;
  }
  .content{
    display: inline-block;
    height: 520px;
    width: 400px;
    float:left;
    background-color: white;
    border-top-right-radius:20px;
    border-bottom-right-radius: 20px;
  }
  .ButtonNull{
    display:inline-block;
    height: 400px;
    width: 400px;
    float:left;
  }
  .possess{
    height: 50px;
    width: 400px;
    margin-top:50px;
  }

  .el-row {
    height: 50px;
    margin-top: 175px;
  }


</style>
