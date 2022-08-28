<template>
<div>
<!--  <div v-for="user in users"> {{ user.title }}</div>-->
  <h1>개발중입니다 ^^</h1>
</div>
</template>

<script>
import { commonAPI as com } from '@/api/index'
export default {
  data() {
    return {
      users: []
    }
  },
  created() {
    this.start()
  },
  methods: {
    async start () {
      try {
        const res = await com.fetchNewsList()
        console.log(res)
      } catch (e) {
        console.error(e)
      }
    },
  },

}
</script>

<style scoped>

</style>