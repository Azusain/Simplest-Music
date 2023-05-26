
<template>
  <div class="manage">
    <div class="manage-header">
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-button type="primary" @click="fanhui">返回</el-button>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入班级" v-model="pageData.clientName"></el-input>
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
          prop="clientEmial"
          label="学院">
        </el-table-column>
        <el-table-column
          prop="clientEmial"
          label="班级">
        </el-table-column>
        <el-table-column
          prop="birth"
          label="作业情况">
          <template slot-scope="scope">
<!--            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>-->
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
  import {getClient, addClient, editClient, delClient, searchClient, PageClient} from "../api";

  export default {
    name: "Workers",
    data() {
      return {
        dialogVisible: false,
        form:{
          clientName:'',
          clientSex:'',
          clientBirthday:'',
          clientPhoneNumber:'',
          clientEmial:'',
          clientBankType:'',
          clientBankNumber:''
        },
        tableData:[],
        modalType: 0,//0表示新增的弹窗，1表示编辑
        total:0,  //当前的总条数
        pageData: {
          page: 1,
          pagesize: 10,
          clientName:'',
        },
        userForm: {
          clientName: ''
        },
        now:1,
        data:0
      }
    },
    methods:{
      handleJump(){
        this.$router.push('/homework/homeworkClass')
      },
      cancel(){
        this.handleClose()
      },
      fanhui() {
        this.getList()
      },
      //修改
      handleEdit(row) {
        this.modalType = 1
        this.dialogVisible = true
        // 注意需要对当前行数据进行深拷贝，否则会出错
        this.form = JSON.parse(JSON.stringify(row))
      },
      //删除
      handleDelete(row) {
        /*弹窗*/
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delClient({id:row.clientId}).then(() => {
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
      getList(){
        // 获取的列表的数据
        getClient({params: {...this.userForm, ...this.pageData}}).then(res => {
          console.log(res)
          this.tableData = res.data
          console.log(res.data.length)
          console.log("1")
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
        PageClient({
          params:{
            page:val,
            pagesize:10
          }
        }).then(res=>{
          this.total=res.data.totalCount
          this.tableData = res.data.rows
          console.log("tableData"+this.tableData)
        })
      },
      xxx(val){
        console.log("current:"+val)
      },
      // 列表的查询
      onSubmit() {
        searchClient(this.pageData).then(res=>{
          this.total=res.data.totalCount
          this.tableData = res.data.rows
          console.log("^^^^^^^^^^^^^"+this.tableData)
        })

      }
    },
    mounted() {
      getClient().then(({data})=>{
        console.log(data)
        this.tableData=data.list
      })
      this.getList()//调用
      this.handlePage(this.now)
      /*      this.handlePage()
            this.onsubmit()*/
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
