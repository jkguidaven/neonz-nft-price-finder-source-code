<template>
  <div class="container">
    <div class="neonz" v-for="(neonz,i) in items" :key="`neonz-${i}`" @click="redirect(`https://objkt.com/asset/neonz/${neonz.id}`)">
        <img :src="neonz.image" />

        <div class="info-box">
            <h1> NEONZ# {{ neonz.id}}</h1>
            <h4> Rarity Rank: {{ neonz.rank}}</h4>
        </div>
    </div>
  </div>
</template>

<script>
import neonzs from '../assets/neonz-metadata.json';

export default {
  name: 'NeonList',

  props: {
    page: {
        type: Number,
        default: 0
    },

    size: {
        type: Number,
        default: 12
    }
  },

  setup() {
      return {
        neonzs
      };
  },

  computed: {
    items() {
        return this.neonzs.slice(this.page * this.size, this.size);
    }
  },

  methods: {
    redirect(url) {
        window.open(url);
    }
  }
}
</script>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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
