<template>
  <template v-if="items.length && !loading">
    <div class="grid">
      <Neonz v-for="neonz in items" :key="`neonz-${neonz.id}`" :value="neonz" />
    </div>

    <button v-if="size < matches.length" @click="$emit('more')">View More Neonz</button>

    <footer>
      If you appreciate my work. I will accept some donation ^_^..

      <h3>tz1aqsCeWnvUeEQxk2TpVsCqLEvchhT2KfYC</h3>
    </footer>
  </template>
  <template v-else>
    <div class="container">
      {{
        loading
          ? "Please wait while we are loading all neonz listing.."
          : "Unfortunately, No Listing found. try to adjust min/max to find something."
      }}
    </div>
  </template>
</template>

<script>
import { ref } from "vue";
import neonzs from "../assets/neonz-metadata.json";
import fetchPriceAPI from "../services/FetchPriceAPI";
import ratePrice from "../services/PriceAnalyzer";
import Neonz from "./Neonz.vue";

export default {
  name: "NeonList",
  inheritAttrs: false,

  components: {
    Neonz,
  },

  props: {
    page: {
      type: Number,
      default: 0,
    },

    size: {
      type: Number,
      default: 30,
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

    this.data.sort((a, b) => {
      if (a.price === b.price) {
        return a.rank - b.rank;
      }

      return a.price - b.price;
    });

    ratePrice(this.data);
    this.loading = false;
  },

  computed: {
    items() {
      if (this.matches.length) {
        return this.matches.slice(this.page * this.size, this.page * this.size + this.size);
      }

      return [];
    },

    matches() {
      if (this.data) {
        return this.data.filter(({ rank }) => rank >= Number(this.min) && rank <= Number(this.max));
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
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  min-height: calc(100% - 101px);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin: 0 auto;
}

@media screen and (max-width: 1024px) {
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media screen and (max-width: 768px) {
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 411px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

footer {
  text-align: center;
  padding: 20px;
}

footer h3 {
  display: block;
  color: rgb(238, 195, 52);
}

button {
  border: 2px solid #0c30fc;
  background-color: #0725cc;
  color: white;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  margin: 20px;
  text-transform: uppercase;
  padding: 20px;
  border-radius: 10px;
}
</style>
