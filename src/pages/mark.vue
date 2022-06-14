<template>
  <div class="q-pa-xs q-gutter-sm">
    <!-- With placeholder -->
    <div>
      <q-scroll-area
        :thumb-style="thumbStyle"
        :content-style="contentStyle"
        :content-active-style="contentActiveStyle"
        style="height: 640px; max-width: 400px;"
      >
        <div class="q-pa-xs col-xs-12 col-sm-8 col-xl-6" v-for="item in items" :key="item.id">
          <q-card class=" transparent text-blue-grey-10">
            <q-card-section>
              <q-item class="absolute-left q-pa-xs">{{item.作者}}</q-item>
              <div class="absolute-right">
                <q-btn class="transparent glossy" flat icon="image_search" @click="usemark=true"></q-btn>
                <q-btn class="transparent glossy" flat icon="create" @click="mark(item.key)" />
                <q-btn class="transparent glossy" flat icon="delete" @click="del(item.key)" />
              </div>
            </q-card-section>
            <q-card-section>
              <div v-if="item.edit">
                <q-markdown>{{item.內文}}</q-markdown>
              </div>
              <div v-else>
                <q-input style="width:100%" filled autogrow v-model="upnote"></q-input>
                <q-btn @click="updatesubmit()">送出</q-btn>
                <q-btn @click="editcancel()">取消</q-btn>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-scroll-area>
    </div>
    <q-dialog v-model="card">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="q-pa-xs">
          <textarea
            style="width:100%"
            rows="5"
            filled
            autogrow
            v-model="writenote"
            placeholder="請輸入內文"
          ></textarea>
        </q-card-section>
        <div class="q-pa-sm">
          <q-card-section>
            <div class="absolute-center">
              <q-btn @click="submit()">送出</q-btn>
              <q-btn @click="cancel()">取消</q-btn>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="usemark">
      <q-card class="bg-grey-3" style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">點按圖片即可複製<br>Markdown插入語法</div>
          <q-btn icon="close" class="absolute-right q-pa-md" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="q-pa-sm row">
            <q-item
              @click.native="copy(pic.圖片連結)"
              v-for="pic in pics"
              :key="pic.id"
              class="justify-center col-10 reverse-wrap"
            >
              <img v-bind:src="pic.圖片連結" class="responsive" style="max-height:120px" />
            </q-item>
          </div>
          <!-- # 這是H1標題
          <br />## 這是H2標題
          <br />### 這是H3標題
          <br />#### 這是H4標題
          <br />##### 這是H5標題
          <br />###### 這是H6標題
          <br />**粗體**
          <br />*斜體*
          <br />插入圖片 ![](http://) -->
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab icon="adb" direction="up" color="cerulean">
        <q-fab-action icon="edit" round @click="card=true" color="orange-8" class="white"></q-fab-action>
        <q-fab-action
          color="papink"
          class="white"
          icon="favorite"
          @click="showNotification('bottom')"
        />
        <q-fab-action @click="alert" color="lemonade" class="white" icon="help" />
        <q-fab-action color="green" class="white" icon="wallpaper" @click="showNotifi('bottom')" />
      </q-fab>
    </q-page-sticky>
    <!-- <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn @click="usemark=true">插入課程截圖</q-btn>
    </q-page-sticky> -->
  </div>
</template>

<script>
import * as firebase from "firebase";
import { date } from "quasar";
const pic = [
  { color: "green", message: "已請求截圖！", icon: "done" },
  { color: "green ", message: "已請求截圖！", icon: "done" },
  { color: "green", message: "已請求截圖！", icon: "done" },
  { color: "green", message: "已請求截圖！", icon: "done" },
  { color: "green", message: "已請求截圖！", icon: "done" }
];
const like = [
  { color: "blue", message: "課堂太精采了！", icon: "thumb_up" },
  { color: "pink", message: "非常喜歡這堂課!", icon: "audiotrack" },
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
  computed: {
    contentStyle() {
      return {
        backgroundColor: "rgba(0,0,0,0.02)",
        color: "#555"
      };
    },

    contentActiveStyle() {
      return {
        backgroundColor: "#eee",
        color: "black"
      };
    },

    thumbStyle() {
      return {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75
      };
    }
  },
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
          .on("value", snapshot => {
            console.log(snapshot.val().username);
            this.username = snapshot.val().username;
          });
        firebase
          .database()
          .ref("users/" + sid + "/nowclass")
          .on("value", snapshot => {
            console.log(snapshot.val());
            this.nowclass = snapshot.val();
            var nowclass = this.nowclass;
            console.log(sid);
            firebase
              .database()
              .ref("note/")
              .on("value", postdata => {
                this.items = postdata.val();
                console.log(postdata.val());
                console.log(this.nowclass);
              });
          });
      } else {
        console.log("沒人登入");
      }
      if (this.hideornot == true) {
        //true為顯示
        this.markhide = false;
      } else {
        this.markhide = true;
      }
    });
    firebase
      .database()
      .ref("screenshoturl/")
      .on("value", snapshot => {
        this.pics = snapshot.val();
      });
  },
  data() {
    return {
      items: [],
      model: "",
      edit: true,
      card: false,
      writenote: "",
      updatenote: false,
      upnote: "",
      index: "",
      usemark: false,
      pics: []
    };
  },
  methods: {
    mark(val) {
      firebase
        .database()
        .ref("note/" + val)
        .update({
          edit: false
        });
      firebase
        .database()
        .ref("note/" + val)
        .once("value", snapshot => {
          this.upnote = snapshot.val().內文;
          this.index = val;
        });
      console.log(val);
    },
    copy(val) {
      console.log(val);
      this.$copyText("![](" + val + ")").then(function(e) {
        swal({ title: "成功複製連結 !" });
      }),
        function(e) {
          swal("複製失敗");
        };
    },
    del(val) {
      console.log(val);
      this.$swal({
        title: "你確定要刪除筆記？",
        text: "刪除後將無法復原！",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "取消",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "確定"
      }).then(result => {
        if (result.value) {
          this.$swal("已刪除！", "", "success");
          firebase
            .database()
            .ref("note/" + val)
            .remove();
        }
      });
    },
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
        console.log(result);
        console.log(this.username);
        firebase
          .database()
          .ref("qna/")
          .push({
            question: result.value,
            發問者: this.username,
            學號: this.sid
          });
      });
    },
    submit() {
      console.log(this.sid);
      console.log(this.writenote);
      let timeStamp = Date.now();
      let formattedString = date.formatDate(timeStamp, "x");
      console.log(formattedString);
      let noteid = this.sid + formattedString;
      console.log(noteid);
      firebase
        .database()
        .ref("note/" + noteid)
        .set({
          內文: this.writenote,
          作者: this.username,
          key: noteid,
          edit: true
        });
      this.card = false;
      this.writenote = "";
    },
    updatesubmit() {
      console.log(this.index);
      let ind = this.index;
      firebase
        .database()
        .ref("note/" + ind)
        .update({
          內文: this.upnote,
          edit: true
        });
      this.writenote = "";
    },
    cancel() {
      // let ind = this.index;
      // firebase.database().ref("note/"+ind).update({
      //   edit: true
      // })
      this.card = false;
      this.updatenote = false;
      this.writenote = "";
    },
    editcancel() {
      let ind = this.index;
      firebase
        .database()
        .ref("note/" + ind)
        .update({
          edit: true
        });
      this.card = false;
      this.updatenote = false;
      this.writenote = "";
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
      firebase
        .database()
        .ref("like/")
        .push({
          發問者: this.username,
          學號: this.sid
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
      firebase
        .database()
        .ref("screenshot/")
        .push({
          發問者: this.username,
          學號: this.sid
        });
    }
  }
};
</script>
<style>
</style>