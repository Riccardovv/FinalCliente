// import  {StoreAlreadyAdded,StoreDoesntExist,ProductDoesntExist,CategoryDoesntExist,ProductAlreadyAdded,CategoryAlreadyExist,ShopAlreadyExist,InvalidValue} from './Exceptions.js'
// import  Coords from './Coords.js'
// import  {Product,Tv,Car,Movie} from './Product.js'
// import  Store from './Store.js'



class StoreHouse {
  // se guardan todas las tiendas existentes en el array stores
  // en el map #products se guardan todos los productos que hay, siendo la key el producto
  //  y el valor el numero de unidades en el inventario


  #name;
  //array de todas las tiendas
  #stores=[];

  //clave producto valor total de stock
  #products=new Map();

  //clave categoria valor array de todos sus productos
  #categories=new Map();
  #defaultCategory;
  #defaultShop;

  constructor(name) {
    if (StoreHouse.hasOwnProperty("StoreHouse")) return StoreHouse.StoreHouse;
    Object.defineProperty(StoreHouse, "StoreHouse", {
      value: this,
      enumerable: false,
      writable: false,
      configurable: false,
    });

    this.#name=name;
    this.#defaultCategory=new Category("default", "default category");
    this.#defaultShop=new Store("default cif", "default name", "default adress", "default phone", new Coords(0,0))
    this.#categories.set(this.#defaultCategory,[]);
    this.#stores.push(this.#defaultShop);

  }
  //añade un producto en tantas categorias como reciba
  addProduct(product, ...categories){
    if(! product instanceof Product) throw new InvalidValue("product", product)
    if(this.#products.has(product)) throw new ProductAlreadyAdded(product);
    this.#products.set(product,0)
    for (const cat of categories) {
      if (this.#categories.has(cat)) {
        this.#categories.get(cat).push(product);
      }
      else{
        this.#categories.set(cat, []);
        this.#categories.get(cat).push(product);
      }
    }
    return this.#products.size;
  }

  //añade una tienda al storehouse
  addShop(shop){
    if(! shop instanceof Store) throw new InvalidValue("shop", shop);
    if (this.#stores.includes(shop)) throw new StoreAlreadyAdded(shop);
    this.#stores.push(shop);
    return this.#stores.length;
  }
  //devuelve un iterador de todas las categorias
  get categories(){
    return this.#categories.keys();
  }
  //devuelve un iterador de todas las tiendas
  get shops(){
    return this.#stores;
  }
  //añade una categoria al mapa de categorias
  addCategory(category){
    if(!category instanceof Category) throw new InvalidValue("category", category)
    if(this.#categories.has(category)) throw CategoryAlreadyExist(category)
    this.#categories.set(category,[]);
    return this.#categories.length;
  }

//añade un producto a una tienda con su cantidad
  addProductInShop(product, shop, cuantity){
    if(! product instanceof Product) throw new InvalidValue("product", product)
    if(shop.products.has(product)) throw new ProductAlreadyAdded(product);

    shop.products.set(product, cuantity);

    if (this.#products.has(product)) {
      this.#products.set(product, this.#products.get(product)+cuantity)
    }else{
      this.#products.set(product,cuantity);
    }
    
    if(!this.#stores.includes(shop)){
      this.#stores.push(shop);
    }

    return this.#products.size;
  }


//elimina una categoria y añade los productos a la categhoria generica
  removeCategory(category){
    if (!this.#categories.has(category)) throw new CategoryDoesntExist(category);
    this.#categories.get(this.#defaultCategory).push(this.#categories.get(category))
    this.#categories.delete(category);
  }


//elimina el producto de todas las tiendas y de la hs
  removeProduct(product){
    if (!this.#products.has(product)) throw new ProductDoesntExist(product);
    this.#stores.forEach(function (value) {
      value.products.delete(product);
    })
    this.#products.delete(product);
  }

  //elimina una tienda y añade sus productos a la tienda generica
  removeStore(shop){
    if (!this.#stores.includes(shop)) throw new StoreDoesntExist(shop);
    this.#stores.splice(this.#stores.indexOf(shop),1);
  }
  //aumenta el stock de un producto en una tienda
  addQuantityProductInShop(product, shop, quantity=1){
    
    if(!shop.products.has(product)) throw new ProductDoesntExist(product)
    shop.products.set(product,( shop.products.get(product)+quantity))
  }

//devuelve todos los productos de una categoria
  getCategoryProducts(category, product){
    if (! this.#categories.has(category)) throw CategoryDoesntExist(category);
    if (product==undefined) {
      let tmp=this.#categories.get(category);
      return tmp.values();
    }else{


    }
  }
//devuelve un iterador con los productos de una tienda dada
  getShopProducts(shop){
    return shop.products.keys();
  }

  get products(){
    return this.#products.keys()
  }

  getCategoryByTitle(title){
    let tmp;
    this.#categories.forEach(function(val,key){
      if(key.title == title){
        tmp = key;
      }
    })
    return tmp
  }


  getShopByCif(cif){
    let tmp;
    for (const s of this.#stores) {
      
      if (s.CIF == cif) {
        
        tmp=s
        console.log(tmp)
      }
    }
    return tmp;
  }


  getProductByName(name){
    let tmp;

    this.#products.forEach(function(value,key,map){
      if(key.name == name){
        //console.log(key,value)
        tmp = key;
      }
    })

    
    return tmp;
  }








}

export default StoreHouse;



