
import StoreHouse from "./StoreHouse.js";



//import fs from "../node_modules/file-system/file-system.js";

class StoreController{
  #storeView;
   #storeModel;
   #ventanas;
   #validate;
   #userFavs;
  constructor(storeModel, storeView, validator) {
      if (StoreController.hasOwnProperty('singleton'))
          return StoreController.singleton;
      Object.defineProperty(StoreController, 'singleton',{
          value: this,
          enumerable:false,
          writable:false,
          configurable:false
      });

      this.#storeModel = storeModel;
     this.#storeView = storeView;
     this.#validate = validator;
     this.#ventanas = [];
     this.#userFavs = [];
 
     // Eventos iniciales del Controlador
     this.onInit();
     this.onLoad();
 
     // Enlazamos handlers con la vista
     this.#storeView.bindInit(this.handleInit);
     this.#storeView.bindShowStores(this.handleShowStores);
     this.#storeView.bindShowCategories(this.handleShowCategories);
     this.#storeView.bindShowProducts(this.handleShowProduts);

     this.#storeView.bindAddProduct(this.handleAddProduct)
     this.#storeView.bindAddCategory(this.handleAddCategory)
     this.#storeView.bindAddStore(this.handleAddStore)

     this.#storeView.bindDeleteStore(this.handleDeleteStore)
     this.#storeView.bindDeleteCategory(this.handleDeleteCategory)
     this.#storeView.bindDeleteProduct(this.handleDeleteProduct)

     this.#storeView.bindLogin(this.handleLogin)
     this.#storeView.bindLogout(this.handleLogout)
     this.#storeView.bindFavs(this.handleFavs)
  }

   //Campos privados
   
   #loadStores(){
      
       let c1 = new Category('cat 1','description 1');
       let c2 = new Category('cat 2','description 2');
       let c3 = new Category('cat 3','description 3');
       let c4 = new Category('cat 4','description 4');
 
       this.#storeModel.addCategory(c1)
       this.#storeModel.addCategory(c2)
       this.#storeModel.addCategory(c3)
       this.#storeModel.addCategory(c4)
       
       
      
      //  this.#storeModel.addCategory(new Category("category 1", "first added category"))
      //  this.#storeModel.addProduct(new Product('serial5','Product1', 'first added product',23,10,'p9.jpg'),new Category("category 2", "second added category"))
       console.log('stores loaded');


       var xhttp = new XMLHttpRequest();
        
       xhttp.onreadystatechange = function(){
         console.dir(this);
         if (this.readyState == 4 && this.status == 200) {
           let controler = new StoreController();
           console.dir(controler.f)
           controler.loadS(this.response)
         }
       };
       xhttp.open("GET", "stores.json",true);
       xhttp.send();
 


       var xhttp = new XMLHttpRequest();
        
      
      xhttp.onreadystatechange = function(){
        console.dir(this);
        if (this.readyState == 4 && this.status == 200) {
          let controler = new StoreController();
          console.dir(controler.f)
          controler.loadP(this.response)
        }
      };
      xhttp.open("GET", "productos.json",true);
      xhttp.send();


      
      
   }
 
  
    loadP(respuesta){
      console.dir(respuesta)
    var respuesta = JSON.parse(respuesta);

   
   for(var i = 0; i < respuesta.length; i++) {
    let prod =new Product(respuesta[i].serial, respuesta[i].name, respuesta[i].description, respuesta[i].price, respuesta[i].tax, respuesta[i].image)

    this.#storeModel.addProductInShop(prod, this.#storeModel.getShopByCif(respuesta[i].storeCif),10)
   }

   }


   loadS(respuesta){
    console.dir(respuesta)
  var respuesta = JSON.parse(respuesta);
 for(var i = 0; i < respuesta.length; i++) {
   console.log(respuesta[i])
   let store =new Store(respuesta[i].CIF, respuesta[i].name, respuesta[i].adress, respuesta[i].phone, new Coords(respuesta[i].x, respuesta[i].y))

    this.#storeModel.addShop(store)
   

 }

 }

 
   onInit = () => {
     this.#storeView.init(this.#validate.validateLogin, this.handleInit);
   }
 
   handleInit = () => {
     this.onInit();
   }
 
   onLoad = () => {
     this.#loadStores();
   }

   handleFavs = () =>{
    console.log('favs');
   }
 
   handleAddProduct = ()  =>{
     this.#storeView.addProduct(this.#storeModel.categories, this.#validate.validateProduct ,this.addProduct);
   }


   handleAddCategory = ()  =>{
    this.#storeView.addCategory(this.#validate.validateCategory ,this.addCategory);
  }

  handleAddStore = ()  =>{
    this.#storeView.addStore(this.#validate.validateStore ,this.addStore);
  }

  handleDeleteStore = ()  =>{
    this.#storeView.deleteStore(this.#storeModel.shops ,this.deleteStore);
  }


  handleDeleteCategory = ()  =>{
    this.#storeView.deleteCategory(this.#storeModel.categories ,this.deleteCategory);
  }


  handleDeleteProduct = ()  =>{
    this.#storeView.deleteProduct(this.#storeModel.products ,this.deleteProduct);
  }


   handleShowStores = () =>{
     this.#storeView.showStores(this.#storeModel.shops)
     this.#storeView.bindShowStoreProducts(this.handleShowStoreProducts)
   }
 
   handleCloseWindows = () =>{
     this.#storeView.bindcloseWindows(this.#storeView.closeWindows,this.#ventanas)
   }
 
   handleShowStoreProducts = (e) =>{
     this.#storeView.showProducts(this.#storeModel.getShopProducts(this.#storeModel.shops[e.target.dataset.position]))
   }
 
   handleShowCategoryProducts = (e) =>{
     this.#storeView.showProducts(this.#storeModel.getCategoryProducts(this.#storeModel.getCategoryByTitle(e.target.dataset.title)))
   }
 
   handleShowCategories = (e) =>{
     this.#storeView.showCategories(this.#storeModel.categories)
     this.#storeView.bindShowCategoryProducts(this.handleShowCategoryProducts)
   }
   
   handleShowProduts= (e) =>{
     this.#storeView.showProducts(this.#storeModel.products);
     this.#storeView.bindOpenWindow(this.#storeView.showProductInWindow,this.#storeModel.getProductByName(e.target.dataset.name))
   }

   handleLogin = (event) =>{
     console.log('handle');
    this.#storeView.login(this.#validate.validateLogin);
   }

   handleLogout = (event) =>{
    console.log('logout');
   this.#storeView.logout(this.onInit);
  }




   addProduct= (form) =>{
    form=form[0];
    this.#storeModel.addProduct(new Product(form.npSerial.value, form.npName.value, form.npDescription.value, form.npPrice.value, form.npTax.value,form.npUrl.value), this.#storeModel.getCategoryByTitle(form.npCategory.value))
   }


   addCategory= (form) =>{
    form=form[0];
    this.#storeModel.addCategory(new Category( form.ncTitle.value,form.ncDescription.value))
   }

   addStore= (form) =>{
    form=form[0];
    this.#storeModel.addShop(new Store( form.nsCif.value, form.nsName.value, form.nsAdress.value, form.nsPhone.value, new Coords((Math.random() * (185 - (-85)) + (-85)),(Math.random() * (185 - (-85)) + (-85)))))
   }


   deleteStore = (cif) =>{

    
     this.#storeModel.removeStore(this.#storeModel.getShopByCif(cif))
   }

   deleteCategory = (title) =>{

    console.log(title);
     this.#storeModel.removeCategory(this.#storeModel.getCategoryByTitle(title))
   }

   deleteProduct = (name) =>{

    this.#storeModel.removeProduct(this.#storeModel.getProductByName(name))
   }


   
 
}
  export default StoreController;