<template>
  <q-page padding class="row justify-center">
    <div style="width: 500px; max-width: 95vw;">
      <q-breadcrumbs separator=">" active-color="blue-grey-10" color="light">
        <q-breadcrumbs-el label="主畫面" to="/main" />
        <q-breadcrumbs-el label="作業繳交" to="/main/hw" />
      </q-breadcrumbs>
      <br />
      <div v-for="item in items" :key="item.id">
        <q-expansion-item popup icon="chrome_reader_mode" :label="item.標題" :sublabel="item.公告日期">
          <div class="q-pa-sm">{{ item.內文 }}</div>
          <div class="q-pa-sm">
            <input id="filename" type="file" @change="sendImage($event)" />
          </div>
          <div class="q-pa-sm">
            <q-btn @click="up()" label="上傳"></q-btn>
          </div>
          <q-linear-progress  stripe rounded size="25px" :value="progress" color="red">
            <div class="absolute-full flex flex-center">
              <q-badge color="white" text-color="red" :label="progressLabel1" />
            </div>
          </q-linear-progress>
        </q-expansion-item>
      </div>
      <q-page-container>
        <router-view />
      </q-page-container>
    </div>
  </q-page>
</template>

<script>
import firebase from "firebase";

export default {
  created: function() {
    const vm = this;
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
            this.uploader = snapshot.val().username;
            this.nowclass = snapshot.val().nowclass;
            var nowclass = this.nowclass;
            firebase
              .database()
              .ref("hw/" + nowclass)
              .once("value", snapshot => {
                this.items = snapshot.val();
                console.log(this.nowclass);
                console.log(snapshot.val());
              });
          });
      }
    });
  },
  computed:{
    progressLabel1 () {
      return ((this.progress).toFixed(2)) *100 + '%'
    },
  },
  methods: {
    // done() {
    //   if (document.getElementById("filename").value == "") {
    //     this.$swal({ type: "warning", title: "請先選擇檔案" });
    //   } else {
    //     (document.getElementById("filename").value = ""),
    //       this.$swal({ type: "success" });
    //   }
    //   console.log(document.getElementById("filename").value);
    // },
    sendImage(e) {
      // const userName = document.querySelector("#js-userName");
      // 取得上傳檔案的資料
      console.log(e)
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      const fileName = this.sid + this.uploader + `_${file.name}`;
      const metadata = {
        contentType: "/*"
      };
      this.file = file;
      this.fileName = fileName;
      this.metadata = metadata;
      console.log("沒問題");
      // 上傳資訊設定
    },
    up() {
      const vv = this;
      if (document.getElementById("filename").value == "") {
        this.$swal({ type: "warning", title: "請先選擇檔案" });
      } else {
        console.log(this.file);
        const uploadTask = firebase
          .storage()
          .ref(this.nowclass + "/")
          .child(this.fileName)
          .put(this.file, this.metadata);
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          function(snapshot) {
            console.log(vv);
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            vv.progress =
              (snapshot.bytesTransferred / snapshot.totalBytes);
              var progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(vv.progress);
            this.progress = progress;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log("Upload is running");
                break;
            }
          },
          function(error) {
            // Handle unsuccessful uploads
          },
          function() {
            console.log(this);
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                console.log("File available at", downloadURL);
              });
            vv.$swal({ type: "success", title: "上傳成功 !" })
            document.getElementById("filename").value = "";
          }
        );
      }
    }
  },
  data() {
    return {
      url: "",
      sid: "",
      nowclass: "",
      items: [],
      progress: 0,
      file: "",
      fileName: "",
      metadata: []
    };
  }
};
</script>

<style>
.clps {
  padding: 20px;
}
</style>
