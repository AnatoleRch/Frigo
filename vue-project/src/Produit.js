
export default class Produit {
    constructor(id, nom, qte, photo) {
        this._id = id; 
        this._nom = nom;
        this._qte = qte; 
        this._photo= photo;     
    }
    
    get id() {
        return this._id;
    }
  
    get nom() {
        return this._nom;
    }

    get photo(){
        return this._photo; 
    }
  
    get qte(){
        return this._qte ; 
    }
  
    set qte (nb){
      return this._qte=nb ; 
    }
  
    pourAfficher() {
      return `--> ${this._id} ${this._photo} ${this._nom} ${this._qte}`;
    }
  }
  