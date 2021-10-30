<template>
  <div class="home">
    <div class="filter-panel">
      <div>
        <h2>RANK (MIN):</h2>
        <input v-model="min" :min="MIN_RANK" :max="MAX_RANK" type="number" />
        <h2>(MAX):</h2>
        <input v-model="max" :min="MIN_RANK" :max="MAX_RANK" type="number" />
      </div>

      <button @click="search">Search</button>
    </div>

    <NeonzList class="list" :size="size" :page="page" :min="currentMin" :max="currentMax" @more="size += PAGE_SIZE" />

    <button v-if="showGotoTopBtn" @click="gotoTop" class="goto-top-button" title="Go to top">Top</button>
  </div>
</template>

<script>
// @ is an alias to /src
import NeonzList from "@/components/NeonzList.vue";
import { ref } from "vue";

const MIN_RANK = 1;
const MAX_RANK = 10000;

const PAGE_SIZE = 30;

export default {
  name: "Home",
  components: {
    NeonzList,
  },

  setup() {
    const min = ref(MIN_RANK);
    const max = ref(MAX_RANK);
    const size = ref(PAGE_SIZE);
    const showGotoTopBtn = ref(false);

    return {
      min,
      max,
      size,
      showGotoTopBtn,
      MIN_RANK,
      MAX_RANK,
      PAGE_SIZE,
    };
  },

  mounted() {
    if (this.$route.query.min) {
      this.min = this.$route.query.min;
    }

    if (this.$route.query.max) {
      this.max = this.$route.query.max;
    }

    window.onscroll = () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        this.showGotoTopBtn = true;
      } else {
        this.showGotoTopBtn = false;
      }
    };
  },

  computed: {
    page() {
      return Number(this.$route.query.page ?? 0);
    },

    currentMin() {
      return Number(this.$route.query.min ?? 1);
    },

    currentMax() {
      return Number(this.$route.query.max ?? 10000);
    },
  },

  methods: {
    search() {
      this.$router.push({
        query: {
          ...this.$route.query,
          min: this.min,
          max: this.max,
        },
      });
      this.size = PAGE_SIZE;
    },

    gotoTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
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
  border: 2px solid #0c30fc;
  background-color: #0725cc;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.goto-top-button {
  display: block;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #0c30fc;
  background-color: #0725cc;
  color: white;
  font-size: 18px;
}

.goto-top-button :hover {
  background-color: #555;
}
</style>
