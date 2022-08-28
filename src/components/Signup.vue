<template>
  <div class="vue-tempalte">
    <form>
      <h3>회원가입</h3>

      <div class="form-group">
        <label>이메일</label>
        <input type="email" class="form-control form-control-lg" />
        <button type="button" name="email" v-on:click="check" class="btn btn-outline-secondary btn-lg btn-block">메일 인증하기</button>
      </div>

      <div class="form-group">
        <label>인증번호 </label>
        <input type="text" class="form-control form-control-lg" />
        <button type="button" class="btn btn-outline-secondary btn-lg btn-block">인증번호 확인</button>
      </div>

      <div class="form-group">
        <label>패스워드</label>
        <input type="password" class="form-control form-control-lg" />
      </div>

      <div class="form-group">
        <label>패스워드 확인</label>
        <input type="password" class="form-control form-control-lg" />
      </div>

      <button type="submit" class="btn btn-dark btn-lg btn-block">
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
export default {
  data() {
    return {
      email:null,
    };
  },
  methods: {
    check(){
      alert("이메일로 인증번호를 보냈습니다.");
    }
  }

};
</script>
