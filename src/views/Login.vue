<template>
  <div class="page">
    <div class="total">
      <div class="content" >
        <h5>登录账号</h5>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="userName">
            <el-input type="id" v-model="ruleForm.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="ButtonNull">
        <el-row>
          <el-button type="primary" class="possess" @click="jumpto">没有账号，点击注册</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import Mock from 'mockjs'
  import Cookie from 'js-cookie'
  import {personal, UserLogin} from "../api";

  export default {
    name: "Login",
    data() {
      return {
        ruleForm: {
          userName:'',
          password: '',
        },
        rules: {
          userName: [
            { required:true, trigger:'blur',message:'请输入用户名'}
          ],
          password: [
            { required:true, trigger:'blur',message:'请输入密码'}
          ],
        }
      };
    },
    methods: {
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            UserLogin(this.ruleForm).then((data)=>{
              console.log(data)
              if(data.code===20000){
                Cookie.set('token',data.token)
                this.$store.commit('setMenu', data.data)
                this.$store.commit('addMenu', this.$router)
                this.$router.push('/first')
              }else {
                this.$message.error(data.msg)
              }
            })
            personal({userName:this.ruleForm.userName}).then((data)=>{
              console.log(data)
            })
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      jumpto(){
        this.$router.push('/regist')
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
    margin-top: 60px;
    font-size: 20px;
    display: block;
  }
  .total{
    height: 400px;
    margin-top: 150px;
    width: 800px;
    border-radius: 20px;
    margin-left: 350px;
    box-shadow: 2px 1px 11px 2px #333;
  }
  .content{
    display: inline-block;
    height: 400px;
    width: 400px;
    float:left;
    background-color: white;
    border-top-left-radius:20px;
    border-bottom-left-radius: 20px;
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
  .el-form-item {
    margin-bottom: 40px;
  }


</style>
