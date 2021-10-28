<template>
  <div class="home">
    <div class="filter-panel">
      <div>
        <h2>RANK (MIN):</h2>
        <input v-model="min" :min="MIN_RANK" :max="MAX_RANK" type="number" />
        <h2>(MAX):</h2>
        <input v-model="max" :min="MIN_RANK" :max="MAX_RANK" type="number" />
      </div>
    </div>

    <NeonzList class="list" :page="page" :min="min" :max="max" />
  </div>
</template>

<script>
// @ is an alias to /src
import NeonzList from "@/components/NeonzList.vue";
import { ref } from "vue";

const MIN_RANK = 1;
const MAX_RANK = 10000;

export default {
  name: "Home",
  components: {
    NeonzList,
  },

  setup() {
    const min = ref(MIN_RANK);
    const max = ref(MAX_RANK);

    return {
      min,
      max,
      MIN_RANK,
      MAX_RANK,
    };
  },

  computed: {
    page() {
      return Number(this.$route.query.page ?? 0);
    },
  },
};
</script>

<style scoped>
.filter-panel {
  padding: 24px;
  display: flex;
  align-items: center;
}

h2,
button {
  display: inline-block;
  margin: 10px;
  text-align: center;
  vertical-align: middle;
}

input,
button {
  border: 2px solid #0725cc;
  border-radius: 5px;
  padding: 10px;
  color: #0725cc;
  background: transparent;
}

button {
  border: 2px solid #0725cc;
  background: #0725cc;
  color: #000;
  font-weight: 700;
  cursor: pointer;
}
</style>
