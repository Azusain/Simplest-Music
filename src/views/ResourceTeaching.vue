<template>
  <div class="manage">
    <!--提交的页面-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form ref="form" :rules="rules":inline="true" :model="form" label-width="80px">
        <el-form-item label="订单号" prop="indentId">
          <el-input v-model="form.indentId"></el-input>
        </el-form-item>
        <el-form-item label="出库时间" prop="outOfDepotTime">
          <el-date-picker
            v-model="form.outOfDepotTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付方式" prop="payWay">
          <el-radio-group v-model="form.payWay">
            <el-radio :label="1">支付宝</el-radio>
            <el-radio :label="0">微信</el-radio>
          </el-radio-group>
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
          <el-input placeholder="请输入订单号" v-model="indentId"></el-input>
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
          prop="indentId"
          label="订单号">
        </el-table-column>
        <el-table-column prop="payWay" label="支付方式">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.payWay===0" >微信</el-tag>
            <el-tag v-if="scope.row.payWay===1" >支付宝</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="outOfDepotTime"
          label="出库时间">
        </el-table-column>


        <el-table-column
          prop="birth"
          label="操作">
          &lt;!&ndash;          <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>&ndash;&gt;
        </el-table-column>-->
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
  import {
    addTransport,
    editTransport,
    delTransport,
    getTransport,
    PageTransport,
    searchTransport,
    addDepot,
    editDepot,
    delDepot,
    getDepot,
    PageDepot,
    searchDepot,
    editEnterDepot,
    addEnterDepot,
    delEnterDepot,
    getEnterDepot,
    searchEnterDepot,
    PageEnterDepot, addOuterDepot, editOuterDepot, delOuterDepot, getOuterDepot, PageOuterDepot, searchOuterDepot
  } from "../api";

  export default {
    name: "Transport",
    data() {
      return {
        dialogVisible: false,
        form:{
          depotId:'',
          indentId:'',
          payWay:'',
          outOfDepotTime:''
        },
        rules:{
          depotId:[
            { required: true, message: '请输入仓库编号'}
          ],
          indentId:[
            { required: true, message: '请输入订单号'}
          ],
          payWay:[
            { required: true, message: '请输入支付方式'}
          ],
          outOfDepotTime:[
            { required: true, message: '请选择入库时间'}
          ],
        },
        tableData:[],
        modalType: 0,//0表示新增的弹窗，1表示编辑
        total:0,  //当前的总条数
        pageData: {
          page: 1,
          pagesize: 10,

        },
        indentId:'',
        userForm: {
          indentId: ''
        },
        now:1,
        data:0
      }
    },
    methods:{
      //提交用户表单
      submit(){
        this.$refs.form.validate((valid)=>{/!*表单校验*!/
          //console.log(valid,'valid')
          if(valid){
            if (this.modalType === 0) {
              addOuterDepot(this.form).then(() => {
                // 重新获取列表的接口
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                this.getList()
              }).finally(()=>{
                this.handlePage(this.now)
              })
            } else {
              editOuterDepot(this.form).then(() => {
                // 重新获取列表的接口
                this.getList()
              }).finally(()=>{
                this.handlePage(this.now)
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
      //修改
      handleEdit(row) {
        this.modalType = 1
        this.dialogVisible = true
        // 注意需要对当前行数据进行深拷贝，否则会出错
        this.form = JSON.parse(JSON.stringify(row))
        return
      },
      //删除
      handleDelete(row) {
        /!*弹窗*!/
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delOuterDepot({indentId:row.indentId}).then(() => {
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
        getOuterDepot({params: {...this.userForm, ...this.pageData}}).then(res => {
          console.log(res)
          this.tableData = res.data
          console.log(res.data.length)
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
        PageOuterDepot({
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
        searchOuterDepot({indentId:this.indentId}).then(res=>{
          console.log("11111111111111111111111111111111111111111")
          this.tableData=[]
          this.tableData.push(res.data)
        })

      }
    },
    mounted() {
      getOuterDepot().then(({data})=>{
        console.log(data)
        this.tableData=data.list
      })
      this.getList()//调用
      this.handlePage(this.now)
      /*           this.handlePage()
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

