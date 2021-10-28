<template>
  <div class="container">
    <template v-if="items.length && !loading">
      <div
        class="neonz"
        v-for="(neonz, i) in items"
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
    </template>
    <template v-else> {{ loading ? "Please wait. loading neonz listing.." : "No Listing found" }}</template>
  </div>
</template>

<script>
import neonzs from "../assets/neonz-metadata.json";
import { ref } from "vue";
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
      default: 100,
    },

    min: {
      type: Number,
      default: 1,
    },

    max: {
      type: Number,
      default: 10000,
    },
  },

  setup() {
    const data = ref([]);
    const loading = ref(true);
    return {
      neonzs,
      data,
      loading,
    };
  },

  async mounted() {
    const getMeta = (id) => {
      return neonzs.find((neonz) => neonz.id === id);
    };

    const result = await fetchPriceAPI();
    this.data = result.map((neonz) => ({
      ...getMeta(neonz.id),
      price: neonz.price,
    }));
    this.loading = false;
  },

  computed: {
    items() {
      if (this.data) {
        return this.data
          .slice(this.page * this.size, this.page * this.size + this.size)
          .filter(({ rank }) => rank >= Number(this.min) && rank <= Number(this.max));
      }

      return [];
    },
  },

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
