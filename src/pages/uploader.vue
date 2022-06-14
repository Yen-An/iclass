<template>
  <!-- <div>
    <q-markdown>![Alt text](https://firebasestorage.googleapis.com/v0/b/test-b994b.appspot.com/o/mana%2F1051241125%E7%8E%8B%E4%BF%8A%E6%99%BA_%EF%BC%91.png?alt=media&token=946b478c-2dac-4034-9142-4256271c02f6)</q-markdown>
  </div>-->
  <q-page class="justify-center">
    <!-- <div class="q-pa-sm row justify-center">
      <q-item @click.native="copy(item.圖片連結)" v-for="item in items" :key="item.id" class="justify-center col-6 reverse-wrap">
        <img v-bind:src="item.圖片連結" class="responsive" style="max-height:200px"  />
      </q-item>
    </div>-->
    <q-input v-model="question" type="text" placeholder="enter the question" />
    <q-input v-model="optiona" type="text" placeholder="enter the option a" />
    <q-input v-model="optionb" type="text" placeholder="enter the option b" />
    <q-input v-model="optionc" type="text" placeholder="enter the option c" />
    <q-input v-model="optiond" type="text" placeholder="enter the option d" />
    <q-select filled v-model="ans" :options="options" label="標準答案是" emit-value />
    <q-btn label="submit" @click="submit()"></q-btn>
    {{ans}}
  </q-page>
</template>

<script>
import * as firebase from "firebase";
export default {
  data() {
    return {
      items: [],
      question: "",
      optiona: "",
      optionb: "",
      optionc: "",
      optiond: "",
      ans: "",
      options: [
        {
          label: "a",
          value: "a"
        },
        {
          label: "b",
          value: "b"
        },
        {
          label: "c",
          value: "c"
        },
        {
          label: "d",
          value: "d"
        }
      ]
    };
  },
  created: function() {
    firebase
      .database()
      .ref("screenshoturl/")
      .on("value", snapshot => {
        this.items = snapshot.val();
      });
    firebase
      .database()
      .ref("ans/")
      .set({
        答題狀況: false
      });
  },
  mounted: function() {
    firebase
      .database()
      .ref("ans/")
      .on("value", function(snapshot) {
        console.log(snapshot.val().答題狀況);
        if (snapshot.val().答題狀況 == true) {
          alert("學生已答題!");
          firebase
            .database()
            .ref("ans/")
            .set({
              答題狀況: false
            });
        }
      });
  },
  methods: {
    // copy(val) {
    //   console.log(val);
    //   this.$copyText("![](" + val + ")").then(function(e) {
    //     Vue.notify("123");
    //   }),
    //     function(e) {
    //       swal("複製失敗");
    //     };
    // },
    submit() {
      firebase
        .database()
        .ref("irs/")
        .push({
          question: this.question,
          a: this.optiona,
          b: this.optionb,
          c: this.optionc,
          d: this.optiond,
          ans: this.ans,
          題號: true
        });
      (this.question = ""),
        (this.optiona = ""),
        (this.optionb = ""),
        (this.optionc = ""),
        (this.optiond = ""),
        (this.ans = "");
    }
  }
};
</script>