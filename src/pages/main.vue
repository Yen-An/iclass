<template>
  <q-page class="col-xs-12 col-xl-8 docs-input justify-center">
    <div class="col-xs-12">
      <div class="q-pa-sm">
        <q-breadcrumbs separator=">" active-color="blue-grey-10" color="light">
          <q-breadcrumbs-el label="選擇課程" to="/chooseclass" />
          <q-breadcrumbs-el label="主畫面" to="/chooseclass/main" />
        </q-breadcrumbs>
      </div>
      <div class="justify-center q-pa-xs row col-xs-12 col-lg-8 col-md-10" align="center">
        <div class="col-xs-6 col-md-5 col-lg-4">
          <q-item  class="col-xs-6 col-md-5 col-lg-4 justify-center" align="center" to="/mark">
            <img src="statics/presentation.png" class="responsive" style="max-height:90px" />
          </q-item>
        </div>
        <div class="col-xs-6 col-md-5 col-lg-4">
          <q-item class="col-xs-6 col-md-5 col-lg-4 justify-center" align="center" to="/post">
            <img src="statics/post-it.png" class="responsive" style="max-height:90px" />
          </q-item>
        </div>
      </div>
      <div class="justify-center q-pa-xs row col-lg-8 col-xs-12 col-md-10" align="center">
        <div class="col-xs-6 col-md-5 col-lg-4" align="center">
          <q-btn
            flat
            push
            rounded
            align="center"
            color="white"
            text-color="blue-grey-10"
            class="text-bold responsive"
            size="30px"
            to="/mark"
            label="開始上課"
          />
        </div>
        <div class="col-xs-6 col-md-5 col-lg-4" align="center">
          <q-btn
            push
            flat
            rounded
            align="center"
            color="white"
            text-color="blue-grey-10"
            class="text-bold responsive"
            size="30px"
            to="/post"
            label="課程公告"
          />
        </div>
      </div>
      <div class="justify-center col-lg-8 col-md-10 q-pa-xs row col-xs-12">
        <div class="col-xs-6 col-md-5 col-lg-4" align="center">
          <q-item class="justify-center" align="center" to="/hw">
            <img src="statics/scoring.png" class="responsive" style="max-height:90px"/>
          </q-item>
        </div>
        <div class="col-xs-6 col-md-5 col-lg-4" align="center">
          <q-item class="justify-center" align="center" to="/feedback">
            <img src="statics/i-message.png" class="responsive" style="max-height:90px" />
          </q-item>
        </div>
      </div>
      <div class="justify-center col-lg-8 col-md-10 q-pa-xs row col-xs-12">
        <div class="col-xs-6 col-md-5 col-lg-4" align="center">
          <q-btn
            flat
            push
            rounded
            align="center"
            color="blue-grey-10"
            size="30px"
            class="text-bold"
            to="/hw"
            label="作業繳交"
          />
        </div>
        <div class="col-xs-6 col-md-5 col-lg-4" align="center">
          <q-btn
            flat
            push
            rounded
            align="center"
            color="blue-grey-10"
            size="30px"
            class="text-bold"
            to="/feedback"
            label="課後回饋"
          />
        </div>
      </div>
    </div>
    歡迎{{username}}進入{{classname}}教室！
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-page>
</template>

<style>
.bg-paper {
  background: #d5d5d5;
}
.bg-smoke {
  background: #6e7376;
}
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>

<script>
import firebase from "firebase";
const db = firebase.firestore();

export default {
  name: "Main",
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("login success");
        var userinfo = firebase.auth().currentUser;
        var email, sid;
        email = userinfo.email;
        sid = userinfo.email.substring(0, 10);
        this.sid = sid;
        firebase
          .database()
          .ref("users/" + this.sid)
          .once("value", snapshot => {
            console.log(snapshot.val().username);
            this.username = snapshot.val().username;
            this.nowclass = snapshot.val().nowclass;
            var nowclass = this.nowclass;
            console.log(nowclass);
            firebase
              .database()
              .ref("課程資料/" + this.nowclass)
              .once("value", snapshot => {
                console.log(snapshot.val().課程名稱);
                this.classname = snapshot.val().課程名稱;
              });
          });
      } else {
        this.$swal("請先登入");
        this.$router.push("/");
      }
    });
  },
  data() {
    return {
      username: "",
      nowclass: "",
      classname: ""
    };
  }
};
</script>
