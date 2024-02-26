<template>
    <div>
      <h2>Rechercher des produits</h2>
      <input type="text" v-model="searchQuery" placeholder="Rechercher..." />
      <button @click="search()">Rechercher</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: ''
      };
    },
    methods: {
      search() {
        this.$emit('search', this.searchQuery);
      }
    }
  };
  </script>