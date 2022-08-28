<template>
  <div class="vue-tempalte">
    <form>
      <h3>비밀번호 찾기</h3>

      <div class="form-group">
        <label>이메일 주소</label>
        <input type="email" class="form-control form-control-lg" />
      </div>

      <div class="form-group">
        <label>인증번호 </label>
        <input type="text" class="form-control form-control-lg" />
        <button type="button" class="btn btn-outline-secondary btn-lg btn-block">인증번호 확인</button>
      </div>


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
