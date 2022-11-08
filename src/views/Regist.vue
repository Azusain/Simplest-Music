<template>
  <div class="page">
    <div class="total">
        <div class="ButtonNull">
          <el-row>
            <el-button type="primary" class="possess">已有账号，直接登录</el-button>
          </el-row>
      </div>
      <div class="content" >
        <h5>注册账号</h5>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="id">
            <el-input type="id" v-model="ruleForm.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">点击注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Regist",
      data() {
        var validateId = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入用户名'));
          }
        };
        var checkAge = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('电话号码不能为空'));
          }
          setTimeout(() => {
            if (!Number.isInteger(value)) {
              callback(new Error('请输入数字值'));
            } else {
              callback();
            }
          }, 1000);
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          ruleForm: {
            id:'',
            pass: '',
            checkPass: '',
            telephone: ''
          },
          rules: {
            id: [
              { validator: validateId, trigger: 'blur' }
            ],
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            telephone: [
              { validator: checkAge, trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
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
    height: 400px;
    margin-top: 150px;
    width: 800px;
    border-radius: 20px;
    margin-left: 350px;
    box-shadow: 1px 2px 11px 2px #333;
  }
  .content{
    display: inline-block;
    height: 400px;
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
  }

  .el-row {
    height: 50px;
    margin-top: 175px;
  }


</style>
