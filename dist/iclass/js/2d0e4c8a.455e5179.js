(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0e4c8a"],{9261:function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("q-layout",[e("q-page-container",[e("q-page",{staticClass:"q-pa-sm docs-input row justify-center"},[e("div",{staticClass:"col-xs-12 col-sm-8 col-xl-6"},[e("q-carousel",{attrs:{"transition-prev":"slide-right","transition-next":"slide-left",animated:"",navigation:"",height:"200px",infinite:"",autoplay:""},model:{value:t.slide,callback:function(s){t.slide=s},expression:"slide"}},[e("q-carousel-slide",{attrs:{name:1,"img-src":"statics/index1.png"}}),e("q-carousel-slide",{attrs:{name:2,"img-src":"statics/index2_0.png"}})],1),e("div",{staticClass:"q-pa-sm col-xs-12 col-sm-8 col-xl-6"},[e("q-input",{attrs:{color:"blue-grey-10",filled:"",label:"請輸入帳號",placeholder:"預設為學校信箱 : 學號@test.com"},model:{value:t.email,callback:function(s){t.email=s},expression:"email"}}),e("q-input",{attrs:{color:"blue-grey-10",label:"請輸入密碼",placeholder:"預設為學號",filled:"",type:t.isPwd?"password":"text"},scopedSlots:t._u([{key:"append",fn:function(){return[e("q-icon",{staticClass:"cursor-pointer",attrs:{name:t.isPwd?"visibility_off":"visibility"},on:{click:function(s){t.isPwd=!t.isPwd}}})]},proxy:!0}]),model:{value:t.password,callback:function(s){t.password=s},expression:"password"}})],1),e("div",{staticClass:"q-pa-sm",attrs:{align:"center"}},[e("q-btn",{staticClass:"button transparent text-blue-grey-10",attrs:{push:"",align:"center",color:"post3",size:"lg"},on:{click:function(s){return t.login()}}},[e("strong",[t._v("\n          登入\n        ")])])],1)],1),e("br"),e("router-view")],1)],1)],1)},a=[],n=(e("a481"),e("8aa5")),l=e.n(n),o={name:"index",data:function(){return{email:"",password:"",slide:1,isPwd:!0}},methods:{login:function(){var t=this;l.a.auth().signInWithEmailAndPassword(this.email,this.password).then((function(s){t.$router.replace("/chooseclass")})).catch((function(s){t.$swal({title:"帳號或密碼錯誤",type:"warning"})}))}}},r=o,c=e("2877"),d=Object(c["a"])(r,i,a,!1,null,null,null);s["default"]=d.exports}}]);