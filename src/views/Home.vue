<template>
  <div class="home">
    <NeonzList :page="page" />
  </div>
</template>

<script>
// @ is an alias to /src
import NeonzList from '@/components/NeonzList.vue'

export default {
  name: 'Home',
  components: {
    NeonzList
  },

  computed: {
    page() {
      return Number(this.$route.query.page) ?? 0;
    }
  }
}
</script>
