<script setup>
import { defineEmits, defineProps } from "vue";

defineProps(["pdt", "supprimer"]);
defineEmits(["augmenter", "diminuer"]);
</script>

<template>
<div class="product">
  <img :src="pdt.photo"/>
    <div>
      <h3>{{ pdt.nom }}</h3>
      <p>Quantité: {{ pdt.qte }}</p>
      <button @click="augmenter(pdt)">+1</button>
      <button @click="diminuer(pdt)">-1</button>
      <button @click="supprimer(pdt.id)">Supprimer</button>
    </div>
</div>
</template>

<style>
.product {
  text-align: center;
  background : lightblue  ;
  color :black ;
  height: 180px;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 35px;
  margin-bottom: 0px;

}

img {
  width : 80px;
  height : 80px;
}
</style>
