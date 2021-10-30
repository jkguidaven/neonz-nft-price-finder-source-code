<template>
  <div class="neonz" @click="redirect(`https://objkt.com/asset/neonz/${value.id}`)">
    <img v-if="image" :src="image" />
    <img v-else :src="require('../assets/neonz_placeholder.gif')" />

    <div class="info-box">
      <h1>NEONZ# {{ value.id }}</h1>
      <h4>Rarity Rank: {{ value.rank }}</h4>
      <h4>Price: {{ value.price / 1000000 }} tez</h4>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ImageRepository from "../services/NeonzImageRepository";

export default {
  name: "Neonz",

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
}

.neonz:hover {
  background: #2529ff;
  color: white;
}

img {
  width: 100%;
  height: auto;
}
</style>
