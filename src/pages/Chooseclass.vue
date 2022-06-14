<template>
  <q-page class="q-pa-md docs-input row justify-center">
    <div class="col-xs-12 col-sm-8 col-xl-6">
      <img src="statics/chooseclass.png" class="q-pa-xs responsive" />
      {{"歡迎"+username+"進入教室 !"}}
      <q-scroll-area
        :thumb-style="thumbStyle"
        :content-style="contentStyle"
        :content-active-style="contentActiveStyle"
        style="height: 450px; max-width: 400px;"
      >
        <div class="col-xs-12 col-sm-8 col-xl-6 try">
          <div v-for="item in items" :key="item.id">
            <transition appear enter-active-class="animated bounceIn">
              <q-item @click.native="whichclass(item)" to="/main">
                <img v-bind:src="item" class="responsive" style="max-height:200px" />
              </q-item>
            </transition>
          </div>
        </div>
      </q-scroll-area>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-page>
</template>

<style>
.try {
  opacity: 0.8;
}
</style>

<script>
import * as firebase from "firebase";

export default {
  computed: {
    contentStyle () {
      return {
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: '#555'
      }
    },

    contentActiveStyle () {
      return {
        backgroundColor: '#eee',
        color: 'black'
      }
    },

    thumbStyle () {
      return {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      }
    }
  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var userinfo = firebase.auth().currentUser;
        var name, email, uid, sid;
        if (userinfo != null) {
          email = userinfo.email;
          uid = userinfo.uid;
          sid = userinfo.email.substring(0, 10);
          this.sid = sid;
          firebase
            .database()
            .ref("users/" + sid + "/username")
            .once("value", name => {
              this.username = name.val();
            });
          firebase
            .database()
            .ref("修課資料/" + sid)
            .once("value", snapshot => {
              console.log(snapshot.val());
              console.log(snapshot.val().mana);
              if (snapshot.val().mana == "true") {
                firebase
                  .database()
                  .ref("課程資料/2/圖片")
                  .once("value", snap => {
                    this.items.push(snap.val());
                  });
              }
              if (snapshot.val().pm == "true") {
                firebase
                  .database()
                  .ref("課程資料/1/圖片")
                  .once("value", snap => {
                    this.items.push(snap.val());
                  });
              }
              if (snapshot.val().mis == "true") {
                firebase
                  .database()
                  .ref("課程資料/3/圖片")
                  .once("value", snap => {
                    this.items.push(snap.val());
                  });
              }
            });
        }
        console.log(sid + "login success");
      } else {
        console.log("沒人登入");
        this.$swal("請先登入");
        this.$router.push("/");
      }
    });
  },

  data() {
    return {
      items: [],
      sid: "",
      username: ""
    };
  },
  methods: {
    whichclass(val) {
      console.log(val);
      if (val == "statics/pm.png") {
        firebase
          .database()
          .ref("users/" + this.sid + "/nowclass")
          .set("pm");
      } else if (val == "statics/mana.png") {
        firebase
          .database()
          .ref("users/" + this.sid + "/nowclass")
          .set("mana");
      } else if (val == "statics/mis.png") {
        firebase
          .database()
          .ref("users/" + this.sid + "/nowclass")
          .set("mis");
      }
    }
  }
};
</script>