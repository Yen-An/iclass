<template>
  <q-page padding class=" docs-input row justify-center">
    <div class="col-xs-12 col-sm-8 col-xl-6">
      <div padding class="q-pa-md">
        <q-breadcrumbs separator=">" active-color="blue-grey-10" color="light">
          <q-breadcrumbs-el label="主畫面" to="/main" />
          <q-breadcrumbs-el label="課程公告" to="/main/post" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-sm col-xs-12 col-sm-8 col-xl-6" v-for="item in items[0]" :key="item.id">
        <q-card  class="full-width transparent" inverted inline>
          <q-card-section>
            <div class="card-title text-brand text-h6">
              <strong>
              {{item.標題}}
              </strong>
              </div>
            <span slot="subtitle">{{item.發布日期}}</span>
            <q-toggle slot="right" v-model="check5" checked-icon="done" unchecked-icon="help" />
          </q-card-section>
          <q-card-section>
            <div class="text-brand text-h7">{{ item.內文 }}</div>
          </q-card-section>
          <q-separator />
          <q-card-actions class="text-brand">
            發布日期： {{item.發布日期}}
          </q-card-actions>
        </q-card>
      </div>
      <q-page-container>
        <router-view />
      </q-page-container>
    </div>
  </q-page>
</template>

<style>

</style>

<script>
import firebase from "firebase";
export default {
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
          .ref("users/" + sid + "/nowclass")
          .once("value", snapshot => {
            console.log(snapshot.val());
            this.nowclass = snapshot.val();
            var nowclass = this.nowclass;
            console.log(nowclass);
            firebase
              .database()
              .ref("post/" + nowclass)
              .on("value", postdata => {
                this.items.push(postdata.val());
                console.log(postdata.val());
                console.log(this.nowclass);
              });
          });
      } else {
        console.log("沒人登入");
      }
    });
  },
  data() {
    return {
      items: [],
      nowclass: "",
      check0: false,
      check5: false,
      stars: 3,
      lorem:
        "下週改為下午1:30上課，請同學早上不要起床，附檔為下週上課講義，請自行列印並帶來上課!!",
      lorem2: "證照考試時間為2019/5/8早上7:30，地點上課教室，題庫如下方附件。"
    };
  }
};
</script>