<template>
  <div class="vue-tempalte">
    <form>
      <h3>로그인</h3>

      <div class="form-group">
        <label>이메일 주소</label>
        <input type="email" class="form-control form-control-lg" />
      </div>

      <div class="form-group">
        <label>패스워드</label>
        <input type="password" class="form-control form-control-lg" />
      </div>

      <button type="submit" class="btn btn-dark btn-lg btn-block">
        로그인
      </button>

      <p class="forgot-password text-right mt-2 mb-4">
        <router-link to="/forgot-password">비밀번호 찾기</router-link>
      </p>

    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
