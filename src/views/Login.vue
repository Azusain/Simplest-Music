<template>
  <div class="page">
    <div class="total">
      <div class="content" >
        <h5>登录账号</h5>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="id">
            <el-input type="id" v-model="ruleForm.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="ButtonNull">
        <el-row>
          <el-button type="primary" class="possess">没有账号，点击注册</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      var validateId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }
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
      return {
        ruleForm: {
          id:'',
          pass: '',
        },
        rules: {
          id: [
            { validator: validateId, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
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
        this.$refs.form.validate((valid) => {
          if (valid) {
            getMenu(this.form).then(({ data }) => {
              console.log(data)
              if (data.code === 20000) {
                // token信息存入cookie用于不同页面间的通信
                Cookie.set('token', data.data.token)

                // 获取菜单的数据，存入store中
                this.$store.commit('setMenu', data.data.menu)
                this.$store.commit('addMenu', this.$router)
                // 跳转到首页
                this.$router.push('/home')
              } else {
                this.$message.error(data.data.message);
              }
            })
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      /*submit() {
        // // token信息
        // const token = Mock.Random.guid()
        // 校验通过
        this.$refs.form.validate((valid) => {
          if (valid) {
            getMenu(this.form).then(({ data }) => {
              console.log(data)
              if (data.code === 20000) {
                // token信息存入cookie用于不同页面间的通信
                Cookie.set('token', data.data.token)

                // 获取菜单的数据，存入store中
                this.$store.commit('setMenu', data.data.menu)
                this.$store.commit('addMenu', this.$router)
                // 跳转到首页
                this.$router.push('/home')
              } else {
                this.$message.error(data.data.message);
              }
            })
          }
        })
      }*/
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
