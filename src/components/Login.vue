<template>
  <div class="vue-tempalte">
    <form>
      <h3>로그인</h3>

      <div class="form-group">
        <label>이메일 주소</label>
        <input type="email" v-model="email" class="form-control form-control-lg" />
      </div>

      <div class="form-group">
        <label>패스워드</label>
        <input type="password" v-model="password" class="form-control form-control-lg" />
      </div>

      <button type="button" v-on:click="login()" class="btn btn-dark btn-lg btn-block">
        로그인
      </button>

      <p class="forgot-password text-right mt-2 mb-4">
        <router-link to="/forgot-password">비밀번호 찾기</router-link>
      </p>

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
      email:'',
      password:'',
      checkUser: false,
      userToken:'',
    };
  },
  methods: {
    login(){
      console.log(this.key)

        com.userLogin({"email" : this.email , "password" : this.password}).then(res => {
            this.userToken = res;
            this.checkUser = true;
            Vue.$toast.success('로그인 되었습니다!');
            Vue.$toast.success('Token = ' + this.userToken);
            this.$router.push('/board')


        }).catch(res => {
          this.checkUser = false;
          Vue.$toast.error('해당 유저가 존재하지 않습니다.');
        });
    }

  },

};
</script>
