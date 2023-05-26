<template>
  <div class="manage">
    <!--提交的页面-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form ref="form" :rules="rules":inline="true" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="employeeName">
          <el-input v-model="form.employeeName"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="employeeBankNumber">
          <el-input v-model="form.employeeBankNumber"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="employeePhoneNumber">
          <el-input v-model="form.employeePhoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="employeeEmail">
          <el-input v-model="form.employeeEmail"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <!--新增框-->
    <div class="manage-header">
      <el-button @click="handleAdd" type="primary">
        + 新增
      </el-button>
      <!--搜索框-->
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-button type="primary" @click="fanhui">返回</el-button>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入姓名" v-model="pageData.employeeName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--页面表格-->
    <div class="common-table">
      <!-- &lt;!&ndash;引入table组件构建表格&ndash;&gt;-->
      <el-table
        stripe
        :data="tableData"
        style="width: 100%" height="90%">
        <el-table-column
          prop="employeeName"
          label="学生姓名">
        </el-table-column>
        <el-table-column
          prop="employeeBankNumber"
          label="学号">
        </el-table-column>
        <el-table-column
          prop="employeePhoneNumber"
          label="手机号码">
        </el-table-column>
        <el-table-column
          prop="employeeEmail"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="birth"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>

        <el-table-column
          prop="situation"
          label="学生情况">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleJump()">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage"
          @size-change="xxx">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUser, addUser, editUser, delUser, searchUser, PageUser} from "../api";

  export default {
    name: "Students",
    data() {
      return {
        dialogVisible: false,
        form:{
          employeeName:'',
          employeeType:'',
          employeePhoneNumber:'',
          employeeEmail:'',
          employeeBankNumber:'',
          employeeBankType:''
        },
        rules:{
          employeeName:[
            { required: true, message: '请输入姓名'}
          ],
          employeeType:[
            { required: true, message: '请选择员工类型'}
          ],
          employeePhoneNumber:[
            { required: true, message: '请输入电话号码'}
          ],
          employeeEmail:[
            { required: true, message: '请输入邮箱账号'}
          ],
          employeeBankNumber:[
            { required: true, message: '请选择银行类型'}
          ],
          employeeBankType:[
            { required: true, message: '请输入银行账号'}
          ],
        },
        tableData:[],
        modalType: 0,//0表示新增的弹窗，1表示编辑
        total:0,  //当前的总条数
        pageData: {
          page: 1,
          pagesize: 10,
          employeeName:'',
        },
        userForm: {
          employeeName: ''
        },
        now:1,
        data:0
      }
    },
    methods:{
      //提交用户表单
      submit(){
        this.$refs.form.validate((valid)=>{/*表单校验*/
          //console.log(valid,'valid')
          if(valid){
            if (this.modalType === 0) {
              addUser(this.form).then(() => {
                // 重新获取列表的接口
                this.getList()
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
              }).finally(()=>{
                this.handlePage(this.now)/*展示列表内容后要处理分页内容*/
              })
            } else {
              editUser(this.form).then(() => {
                // 重新获取列表的接口
                this.getList()
              }).finally(()=>{
                this.handlePage(this.now)/*展示列表内容后要处理分页内容*/
              })
            }
            console.log(this.form,'form')
            //清空表单
            this.$refs.form.resetFields()
            //关闭弹窗
            this.dialogVisible=false
          }
        })
      },
      //弹窗关闭的时候
      handleClose() {
        console.log( this.$refs.form)
        //清空表单
        this.$refs.form.resetFields()
        this.dialogVisible=false
      },
      cancel(){
        this.handleClose()
      },
      fanhui() {
        this.getList()
      },
      handleEdit(row) {
        this.modalType = 1
        this.dialogVisible = true
        // 注意需要对当前行数据进行深拷贝，否则会出错
        this.form = JSON.parse(JSON.stringify(row))
      },
      handleDelete(row) {
        /*弹窗*/
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser({id:row.employeeId}).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            // 重新获取列表的接口
            this.getList()
          }).finally(()=>{
            this.handlePage(this.now)
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /*学生详情页面跳转*/
      handleJump(){
        this.$router.push('/student/studentDetail/studentSituation')
      },
      getList(){
        // 获取的列表的数据
        getUser({params: {...this.userForm, ...this.pageData}}).then(res => {
          this.tableData = res.data
          this.total = res.data.length || 0
        })
      },
      handleAdd() {
        this.modalType = 0
        this.dialogVisible = true
      },
      // 选择页码的回调函数
      handlePage(val) {
        this.now=val
        PageUser({
          params:{
            page:val,
            pagesize:10
          }
        }).then(res=>{
          this.total=res.data.totalCount
          this.tableData = res.data.rows
        })
      },
      xxx(val){
        console.log("current:"+val)
      },
      // 列表的查询
      onSubmit() {
        searchUser(this.pageData).then(res=>{
          this.total=res.data.totalCount
          this.tableData = res.data.rows
        })

      }
    },
    mounted() {
      getUser().then(({data})=>{
        console.log(data)
        this.tableData=data.list
      })
      this.getList()//调用
      this.handlePage(this.now)
    }

  }
</script>

<style lang="less" scoped>
  .manage {
    height: 90%;
    .manage-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .common-table {
      position: relative;
      height: calc(100% - 62px);
      .pager {
        position: absolute;
        bottom: 0;
        right: 20px;
      }
    }
  }
</style>
