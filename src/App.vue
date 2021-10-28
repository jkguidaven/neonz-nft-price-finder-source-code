<template>
  <NeonzList
    :page="page"
  />
</template>

<script>
import NeonzList from './components/NeonzList.vue'

export default {
  name: 'App',
  components: {
    NeonzList
  },

  computed: {
    page() {
      return this.$route.query.page ?? 0;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2529ff;
  margin-top: 60px;
}

body {
  background-color: black;
}
</style>
