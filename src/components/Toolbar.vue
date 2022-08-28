<template>
  <div class="header">
    <router-link to="/news">News</router-link> |
    <router-link to="/ask">Ask</router-link> |
    <router-link to="/jobs">Jobs</router-link>
  </div>
</template>

<script>
export default {
  name: toolbar
}
</script>

<style scoped>
.header {
  color: aliceblue;
  background-color: gray;
  justify-content: space-between;
  align-items: center;

  display: flex;
  padding: 8px;
}
.header .router-link-exact-active {
  color: darkgreen;
}
.header a {
  color: white;    display: flex;
  margin-right: 60px;
}
</style>