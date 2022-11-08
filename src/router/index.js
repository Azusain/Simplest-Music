import Vue from 'vue'
import Router from 'vue-router'
import Main from "../views/Main";
import Login from "../views/Login";
import Regist from "../views/Regist";
import First from "../views/First";
import Workers from "../views/Workers";
import Customers from "../views/Customers";
import Package from "../views/Package";
import Finance from "../views/Finance";
import Inventory from "../views/Inventory";
import Inwarehouse from "../views/Inwarehouse";
import Outwarehouse from "../views/Outwarehouse";
import Carpossess from "../views/Carpossess";
import Carusing from "../views/Carusing";
import Tasks from "../views/Tasks";
import Accidents from "../views/Accidents";

Vue.use(Router);

export default new Router({
  routes:[{
    path: '/',
    component: Main,
    name: 'Main',
    redirect:'first',
    children:[
      {path: 'first', component: First},
      {path: 'workers', component: Workers},
      {path: 'customers', component: Customers},
      {path: 'package',component:Package},
      {path:'finance',component:Finance},
      {path:'warehouse/inventory',component:Inventory},
      {path:'warehouse/inwarehouse',component:Inwarehouse},
      {path:'warehouse/outwarehouse',component:Outwarehouse},
      {path:'transport/carpossess',component:Carpossess},
      {path:'transport/carusing',component:Carusing},
      {path:'distribution/tasks',component:Tasks},
      {path:'distribution/accidents',component:Accidents}
    ]
  },{
    path: '/login', component: Login
  },{
    path: '/regist', component: Regist
  }]
});

