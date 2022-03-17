
import StoreHouse from "./StoreHouse.js";


class StoreController{
  #storeView;
   #storeModel;
   #ventanas;
   #validate;
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
  }

   //Campos privados
   
   #loadStores(){
       let nShop1 = new Store('11111','store1','adress1','111111111',new Coords(85345,9465467));
       let nShop2 = new Store('22222','store2','adress2','22222222',new Coords(1234,743256));
       let nShop3 = new Store('333333','store3','adress3','3333333',new Coords(1234,743256));
       let nShop4 = new Store('t444444','store4','adress4','444444444',new Coords(134321,412342));
       this.#storeModel.addShop(nShop1)
       this.#storeModel.addShop(nShop3)
       this.#storeModel.addShop(nShop2)
       let c1 = new Category('cat 1','description 1');
       let c2 = new Category('cat 2','description 2');
       let c3 = new Category('cat 3','description 3');
       let c4 = new Category('cat 4','description 4');
 
       this.#storeModel.addCategory(c1)
       this.#storeModel.addCategory(c2)
       this.#storeModel.addCategory(c3)
       this.#storeModel.addCategory(c4)
       
       this.#storeModel.addProductInShop(new Product('serial1','Product1', 'first added product',23,10,'p1.jpg'),nShop1,10)
       this.#storeModel.addProductInShop(new Product('serial1','Product1', 'first added product',23,10,'p3.jpg'),nShop1,10)
       this.#storeModel.addProductInShop(new Product('serial1','Product1', 'first added product',23,10,'p2.jpg'),nShop1,10)
       this.#storeModel.addProductInShop(new Product('serial1','Product1', 'first added product',23,10,'p4.jpg'),nShop2,10)
       this.#storeModel.addProductInShop(new Product('serial1','Product1', 'first added product',23,10,'p5.jpg'),nShop2,10)
       this.#storeModel.addProductInShop(new Product('serial1','Product1', 'first added product',23,10,'p6.jpg'),nShop2,10)
       this.#storeModel.addProductInShop(new Product('serial1','Product1', 'first added product',23,10,'p7.jpg'),nShop3,10)
       this.#storeModel.addProductInShop(new Product('serial1','Product1', 'first added product',23,10,'p8.jpg'),nShop3,10)
       this.#storeModel.addProductInShop(new Product('serial1','Product1', 'first added product',23,10,'p9.jpg'),nShop3,10)
       this.#storeModel.addProductInShop(new Product('serial1','Product1', 'first added product',23,10,'p10.jpg'),nShop4,10)
       this.#storeModel.addProductInShop(new Product('serial1','Product1', 'first added product',23,10,'p11.jpg'),nShop4,10)
       this.#storeModel.addProductInShop(new Product('serial1','Product1', 'first added product',23,10,'p12.jpg'),nShop4,10)
       this.#storeModel.addCategory(new Category("category 1", "first added category"))
       this.#storeModel.addProduct(new Product('serial5','Product1', 'first added product',23,10,'p9.jpg'),new Category("category 2", "second added category"))
       console.log('stores loaded');
   }
 
  
 
   onInit = () => {
     this.#storeView.init();
   }
 
   handleInit = () => {
     this.onInit();
   }
 
   onLoad = () => {
     this.#loadStores();
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
 
}
  export default StoreController;