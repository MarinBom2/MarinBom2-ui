<template>
  <div class="vue-tempalte">
    <form>
      <h3>회원가입</h3>

      <div class="form-group">
        <label>이메일</label>
        <input type="email" v-model="email" class="form-control form-control-lg" />
        <button type="button"  v-on:click="sendEmail()" class="btn btn-outline-secondary btn-lg btn-block">메일 인증하기</button>
      </div>

      <div class="form-group">
        <label>인증번호 </label>
        <input type="text" v-model="key" class="form-control form-control-lg" />
        <button type="button" v-on:click="sendAuthKey()" class="btn btn-outline-secondary btn-lg btn-block">인증번호 확인</button>
      </div>

      <div class="form-group">
        <label>패스워드</label>
        <input type="password" v-model="password" class="form-control form-control-lg" />
      </div>

      <div class="form-group">
        <label>패스워드 확인</label>
        <input type="password" v-model="repassword" class="form-control form-control-lg" />
        <button type="button" v-on:click="checkUserPassword()" class="btn btn-outline-secondary btn-lg btn-block">패스워드 확인</button>
      </div>


      <button type="button" v-on:click="sendUserData()" class="btn btn-dark btn-lg btn-block">
        회원가입
      </button>

<!--      <p class="forgot-password text-right">-->
<!--        Already registered-->
<!--        <router-link :to="{ name: 'login' }">sign in?</router-link>-->
<!--      </p>-->
    </form>
  </div>
</template>

<script>
import { commonAPI as com } from '@/api/index'
import Vue from 'vue';
import VueToast from 'vue-toast-notification';

Vue.use(VueToast, {
  // One of the options
  position: 'top'
})

export default {
  data() {
    return {
      email: '',
      checkMail: false,
      key: '',
      checkKey: false,
      password: '',
      repassword: '',
      checkPassword: false,

    };
  },
  watch: {

  },
  methods: {
    sendEmail(){
      com.sendAuthMail(this.email).then(res => {
        this.checkMail = true;
        Vue.$toast.success('이메일로 인증번호를 보냈습니다.');
      }).catch(res => {
        this.checkMail = false;
        Vue.$toast.error("메일 인증에 실패했습니다.")
      });
    },
    sendAuthKey(){
      console.log(this.key)
      this.checkMail = true;
      if(this.checkMail == false) {
        Vue.$toast.error('메일 인증을 먼저 해주세요!');
      }else {
        com.sendAuthKey({"email" : this.email , "authKey" : this.key}).then(res => {
          if(res.data == true) {
            this.checkKey = true;
            Vue.$toast.success('인증번호가 확인되었습니다!');
          }
        }).catch(res => {
          this.checkKey = false;
          Vue.$toast.error('인증번호가 다릅니다.');
        });
      }

    },
    sendUserData(){
      if(this.checkMail && this.checkKey && this.checkPassword) {


        com.sendUserData({"email" : this.email , "password" : this.password}).then(res => {
          if(res.data == true) {
            Vue.$toast.success('회원가입이 완료되었습니다!');
            this.initState();
            this.$router.push('/')
          }else {
            Vue.$toast.error('이미 사용중인 이메일입니다.');
            this.initState();
          }
        }).catch(res => {
          Vue.$toast.error('회원가입에 실패하였습니다.');
        });
      }else {
        Vue.$toast.error("email =  " + this.checkMail + ", " + "authKey =  " + this.checkKey + ",  "
            + "password =  "+ this.checkPassword
            + "  항목을 확인해주세요")
      }
    },
    checkUserPassword() {
      if(this.password === this.repassword && this.password != '') {
        this.checkPassword = true;
        Vue.$toast.success('패스워드가 동일합니다!');
      }else {
        this.checkPassword = false;
        Vue.$toast.error('패스워드가 다릅니다.');
      }
    },
    initState(){
      this.checkMail = false;
      this.checkPassword = false;
      this.checkKey = false;
    },



  }

};
</script>

