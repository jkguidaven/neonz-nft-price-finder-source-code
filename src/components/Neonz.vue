<template>
  <div class="neonz" :class="{ good: value.good }" @click="redirect(`https://objkt.com/asset/neonz/${value.id}`)">
    <img v-if="image" :src="image" />
    <img v-else :src="require('../assets/neonz_placeholder.gif')" />

    <div class="info-box">
      <h1>NEONZ# {{ value.id }}</h1>
      <h4>Rarity Rank: {{ value.rank }}</h4>
      <h4>Price: {{ value.price / 1000000 }} tez</h4>
      <h5 v-if="value.good">
        GOOD DEAL!! <br />
        outprice {{ formatScore(value.score) }} of Lower Rank
      </h5>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ImageRepository from "../services/NeonzImageRepository";

export default {
  name: "Neonz",
  inheritAttrs: false,

  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const image = ref(null);

    return {
      image,
    };
  },

  methods: {
    redirect(url) {
      window.open(url);
    },

    formatScore(value) {
      return `${value.toFixed(2)}%`;
    },
  },

  async mounted() {
    const repository = new ImageRepository();
    this.image = await repository.getImage(this.value.image);
  },
};
</script>

<style scoped>
.neonz {
  border: 1px solid #2529ff;
  cursor: pointer;
  padding-bottom: 20px;
}

.neonz:hover {
  background: #2529ff;
  color: white;
}

.neonz.good {
  border: 1px solid #f3ff00;
  background: #ff3c00;
  color: #f3ff00;
}

.neonz.good:hover {
  border: 1px solid #ff3c00;
  background: #f3ff00;
  color: #ff3c00;
}

img {
  width: 100%;
  height: auto;
}

h4 {
  margin: 10px 0;
}

h5 {
  display: block;
  text-align: center;
  margin: -5px 0 -2px;
  text-decoration: underline;
}
</style>
