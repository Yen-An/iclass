<template>
  <q-page padding class="row justify-center">
    <div style="width: 500px; max-width: 95vw;">
      <q-breadcrumbs separator=">" active-color="turq" color="light">
        <q-breadcrumbs-el label="主畫面" to="/main" />
        <q-breadcrumbs-el label="上課畫面" to="/main/class" />
      </q-breadcrumbs>
      <br />
      {{model}}
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab icon="adb" direction="up" color="cerulean">
        <q-fab-action
          color="papink"
          class="white"
          icon="favorite"
          @click="showNotification('bottom')"
        />
        <q-fab-action @click="alert" color="lemonade" class="white" icon="help" />
        <q-fab-action color="green" class="white" icon="wallpaper" @click="showNotifi('center')" />
      </q-fab>
    </q-page-sticky>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-page>
</template>

<style lang="stylus"></style>

<script>
import firebase, { functions } from "firebase";
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    var userinfo = firebase.auth().currentUser;
    var email = userinfo.email;
    var sid = userinfo.email.substring(0, 10);
    this.sid = userinfo.email.substring(0, 10);
    firebase.database().ref("note/1051241125").on("value",snapshot=>{
      this.model=snapshot.val()
    })
    console.log("login success");
  } else {
    console.log("沒人登入");
  }
});
const pic = [
  { color: "green", message: "截圖成功！", icon: "done" },
  { color: "green ", message: "截圖成功！", icon: "done" },
  { color: "green", message: "截圖成功！", icon: "done" },
  { color: "green", message: "截圖成功！", icon: "done" },
  { color: "green", message: "截圖成功！", icon: "done" }
];
const like = [
  { color: "blue", message: "你覺得老師說得太讚了！", icon: "thumb_up" },
  { color: "pink", message: "老師知道你很愛他!", icon: "audiotrack" },
  {
    color: "post3",
    textColor: "black",
    message: "繼續認真上課！",
    icon: "thumb_up"
  },
  { color: "secondary", message: "灑花～灑花～", icon: "filter_vintage" },
  {
    color: "zig",
    textColor: "black",
    message: "真的說得那麼好？",
    icon: "help_outline"
  }
];
export default {
  methods: {
    alert() {
      this.$swal({
        title: "老師我有問題",
        type: "question",
        input: "text",
        inputPlaceholder: "輸入你的問題",
        showCancelButton: true
      }).then(result => {
        this.$swal({
          title: "老師收到你的問題了 !",
          type: "success"
        });
      });
    },
    showNotification(position) {
      const { color, textColor, icon, message, avatar } = like[
        Math.floor(Math.random(5) * 10) % 5
      ];
      this.$q.notify({
        color,
        textColor,
        icon,
        message,
        position,
        avatar,
        actions:
          Math.random() * 100 > 50
            ? [
                {
                  label: "",
                  handler: () =>
                    console.log("Clicked on a notification handler")
                }
              ]
            : null,
        timeout: Math.random() * 5000 + 3000
      });
    },
    showNotifi(position) {
      const { color, textColor, icon, message, avatar } = pic[
        Math.floor(Math.random(5) * 10) % 5
      ];
      this.$q.notify({
        color,
        textColor,
        icon,
        message,
        position,
        avatar,
        timeout: Math.random() * 5000 + 3000
      });
    },
    note() {
      firebase
        .database()
        .ref("note/" + sid + "/")
        .set(this.model);
    }
  },
  data() {
    return {
      visible: true,
      visible2: true,
      model: ""
    };
  }
};
</script>
