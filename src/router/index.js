import Vue from 'vue'
import Router from 'vue-router'
import Main from "../views/Main";
import Login from "../views/Login";
import Regist from "../views/Regist";
import StudentSituation from "../views/StudentSituation";
import HomeworkClass from "../views/HomeworkClass"
import ExaminationClass from "../views/ExaminationClass";
import HomeworkDetail from "../views/HomeworkDetail";
import StudentDetail from "../views/StudentDetail";
import ExaminationDetail from "../views/ExaminationDetail";


Vue.use(Router);

export default new Router({
  routes:[{
    path: '/',
    component: Main,
    name: 'Main',
    redirect:'/login',
    children:[
/*      {path: 'first', name:'首页',component: First},
      {path: 'workers', name:'员工管理',component: Workers},
      {path: 'customers', name:'客户管理',component: Customers},
      {path: 'package',component:Package},
      {path:'finance',component:Finance},
      {path:'warehouse/inventory',component:Inventory},
      {path:'warehouse/inwarehouse',component:Inwarehouse},
      {path:'warehouse/outwarehouse',component:Outwarehouse},
      {path:'transport/carpossess',component:Carpossess},
      {path:'transport/carusing',component:Carusing},
      {path:'distribution/tasks',component:Tasks},
      {path:'distribution/accidents',component:Accidents}*/
      {
        path: '/student/studentDetail',component:StudentDetail
      },{
        path:'/student/studentDetail/studentSituation',component: StudentSituation
      },
      {
        path: '/homework/homeworkClass',component:HomeworkClass
      },{
        path:'/examination/examinationClass',component: ExaminationClass
      },{
        path: '/homework/homeworkClass/homeworkDetail',component:HomeworkDetail
      },{
        path:'/examination/examinationClass/examinationDetail',component: ExaminationDetail
      }
    ]
  },{
    path: '/login', name:'login',component: Login
  },{
    path: '/regist', name:'regist',component: Regist
  }]
});

