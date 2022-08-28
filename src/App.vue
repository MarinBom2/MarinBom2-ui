<template>
  <!--  <div id="app">-->
  <!--    <toolbar></toolbar>-->
  <!--    <router-view></router-view>-->
  <!--  </div>-->
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav
      class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top"
    >
      <div class="container">
        <a
          class="navbar-brand float-left"
          href="https://blog.naver.com/gojgho"
          target="_blank"
          style="color: #3CB371"
        >
        MarinBom2
        </a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item" v-if="this.check">
            <router-link class="btn btn-outline-primary" to="/news">게시판</router-link>
          </li>

          <li class="nav-item">
            <router-link class="btn btn-outline-secondary" to="/">로그인</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-secondary" to="/signup">회원가입</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Toolbar from "@/components/Toolbar";
import { commonAPI as com } from '@/api/index'



export default {
  name: 'App',
  // components: {
  //   Toolbar
  // }
  data() {
    return {
       check:'',
    }
  },
  created() {
    this.member()
  },
  methods: {

    member() {
      com.fetchNewsList().then(res => {
        console.log(res);
        this.check = res.data[0].name == 'gojgho' ? true : false;

      });
    }
  }
}
</script>

<style>

</style>
