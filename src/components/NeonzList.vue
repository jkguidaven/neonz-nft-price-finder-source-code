<template>
  <div class="container">
    <div
      class="neonz"
      v-for="(neonz, i) in data"
      :key="`neonz-${i}`"
      @click="redirect(`https://objkt.com/asset/neonz/${neonz.id}`)"
    >
      <img :src="neonz.image" />

      <div class="info-box">
        <h1>NEONZ# {{ neonz.id }}</h1>
        <h4>Rarity Rank: {{ neonz.rank }}</h4>
        <h4>Price: {{ neonz.price / 1000000 }} tez</h4>
      </div>
    </div>
  </div>
</template>

<script>
import neonzs from "../assets/neonz-metadata.json";
import { watchEffect, ref } from "vue";
import fetchPriceAPI from "./FetchPriceAPI";

export default {
  name: "NeonList",

  props: {
    page: {
      type: Number,
      default: 0,
    },

    size: {
      type: Number,
      default: 20,
    },

    rankStart: {
      type: Number,
      default: 1,
    },

    rankEnd: {
      type: Number,
      default: 10000,
    },
  },

  setup(prop) {
    const data = ref([]);
    const getMeta = (id) => {
      return neonzs.find((neonz) => neonz.id === id);
    };
    watchEffect(async () => {
      const result = await fetchPriceAPI(prop.rankStart, prop.rankEnd);
      data.value = result.slice(prop.page * prop.size, prop.page * prop.size + prop.size).map((neonz) => ({
        ...getMeta(neonz.id),
        price: neonz.price,
      }));
    });

    return {
      neonzs,
      data,
    };
  },

  computed: {},

  methods: {
    redirect(url) {
      window.open(url);
    },
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

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
