<template>
  <div id="app">
    <h1>Mon Frigo</h1>
    <div>
      <h2>Rechercher des produits</h2>
      <input type="text" v-model="aTrouver" placeholder="Rechercher..." />
      <button @click="rechercher()">Rechercher</button>
    </div>
    <div class="ajout">
      <h2>Ajouter un produit</h2>
      <input type="text" v-model="Nnom" placeholder="Nom du produit" />
      <input type="number" v-model.number="Nqte" placeholder="Quantité" min="1" />
      <input type="text" v-model="Nphoto" placeholder="URL de la photo" />
      <button @click="ajouter()">Ajouter</button>
    </div>
    <br>
    <div class="frigo">
      <BlocProduit
        v-for="pdt of listeC"
        :key="pdt.id"
        :pdt="pdt"
        :supprimer="supprimer"
        :augmenter="augmenter"
        :diminuer="diminuer"
      ></BlocProduit>
    </div>
  </div>
</template>

<script>
import BlocProduit from './BlocProduit.vue';

import Produit from '../Produit';
import { ref } from "vue";

const Nnom = ref("");
const Nqte = ref(1);
const Nphoto = ref("");
const aTrouver = ref("");
const listeC = ref([]);

const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/22/produits";

function fetchProduits() {
  fetch(`${url}?search=${aTrouver.value}`)
    .then(response => {
      return response.json();
    })
    .then(data => {

      let produitsASupprimer = data.filter(item => item.qte <= 0);
      produitsASupprimer.forEach(item => {
        supprimer(item.id);
      });
      listeC.value = data.map(item => new Produit(item.id, item.nom, item.qte, item.photo));


    })
    .catch(error => {
      console.error('error', error);
    });
}

function ajouter() {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nom: Nnom.value,
      qte: Nqte.value,
      photo: Nphoto.value
    })
  })
    .then(response => response.json())
    .then(dataJSON => {
        Nnom.value = "";
        Nqte.value = 1;
        Nphoto.value = "";
        fetchProduits();
    })
    .catch(error => {
      console.error('Error', error);
    });
}

function supprimer(produitId) {
  fetch(`${url}/${produitId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(dataJSON => {
      fetchProduits();
      
    })
    .catch(error => {
      console.error('error', error);
    });
}

function augmenter(produit) {
  produit.qte++;
  updateProduct(produit);
}

function diminuer(produit) {
  if (produit.qte > 0) {
    produit.qte--;
    updateProduct(produit);
  }
}

function updateProduct(produit) {
  if (produit.qte <= 0) {
    supprimer(produit.id);
  }
    fetch(`${url}`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: produit.id,
        nom: produit.nom,
        qte: produit.qte,
        photo: produit.photo
      })
    })
    .catch(error => {
      console.error('error', error);
    });
  
}

function rechercher() {
  fetchProduits();
}

fetchProduits();

export default {
  components: {
    BlocProduit
  },
  data() {
    return {
      Nnom,
      Nqte,
      Nphoto,
      aTrouver,
      listeC
    };
  },
  methods: {
    fetchProduits,
    ajouter,
    supprimer,
    augmenter,
    diminuer,
    updateProduct,
    rechercher
  }
};
</script>


<style>
.frigo {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0px;
  grid-auto-rows: minmax(auto,210px);
  background-image : url("/src/assets/image-frigo.jpg") ;
  background-size: 600px;
  width: 600px;
  height: 1100px;
}
.ajout {
  
  margin-bottom: 1em;
  
}


</style>