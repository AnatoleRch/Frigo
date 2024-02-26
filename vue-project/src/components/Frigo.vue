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
      <input type="number" v-model.number="Nqte" placeholder="Quantité" />
      <input type="text" v-model="Nphoto" placeholder="URL de la photo" />
      <button @click="ajouter()">Ajouter</button>
    </div>
    <br>
    <div class="frigo">
      <div class="product" v-for="pdt in listeC" :key="pdt.id">
        <img :src="pdt.photo"/>
        <div>
          <h3>{{ pdt.nom }}</h3>
          <p>Quantité: {{ pdt.qte }}</p>
          <button @click="augmenter(pdt)">+1</button>
          <button @click="diminuer(pdt)">-1</button>
          <button @click="supprimer(pdt.id)">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Produit from '../Produit';
import { ref } from "vue";

const Nnom = ref("");
const Nqte = ref(0);
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
        Nqte.value = 0;
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
}

function rechercher() {
  fetchProduits();
}

fetchProduits();

export default {
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
.ajout {
  
  margin-bottom: 1em;
  
}
img {
  width : 80px;
  height : 80px;
}

</style>