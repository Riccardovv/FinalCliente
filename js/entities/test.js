let sh= new StoreHouse("shorehouse1");
let procduct1= new Product("serial1", "name1", "description1", 10, 21, "p1");
let procduct2= new Product("serial2", "name2", "description2", 10, 21, "p2");
let procduct3= new Product("serial3", "name3", "description3", 10, 21, "p2");
let procduct4= new Product("serial4", "name4", "description4", 10, 21, "p2");

let category1=new Category("category1", "description category1")
let category2=new Category("category2", "description category2")
let category3=new Category("category3", "description category3")

let c1 = new Coords(333,444)
let store2=new Store("cif2","name store2", "adress2", "phone2", c1)

let c2 = new Coords(111,222)
let store1=new Store("cif1","name store 1", "adress1", "phone1", 21)

console.dir(sh);
sh.addShop(store1);
sh.addShop(store2);
let stores=sh.shops;

for (const i of stores) {
  console.dir(i);
}

sh.addCategory(category1);
sh.addCategory(category2);
sh.addCategory(category3);

let categ=sh.categories;

for (const i of categ) {
  console.log(i);
}

sh.removeCategory(category1);
console.log("remover categoria--------");
let categ1=sh.categories;

for (const i of categ1) {
  console.log(i);
}


sh.addProductInShop(procduct1,store1,10);

console.log("productos store 1");
console.dir(store1.products)
console.log("borrar productos");
sh.removeProduct(procduct1);
console.dir(store1.products);
sh.addProductInShop(procduct2,store1,0);

sh.addQuantityProductInShop(procduct2,store1,33);
console.dir(store1.products);

let cat= sh.getCategoryProducts(category2);
sh.addProduct(procduct3,category2,category3);
sh.addProduct(procduct4,category2,category3)


for (const i of cat) {
  console.log(i);
}

sh.removeStore(store1);


let stores2=sh.shops;

for (const i of stores2) {
  console.dir(i);
}

let p= sh.getShopProducts(store1);
console.log("prductos en una tienda");
for (const i of p) {
  console.dir(i);
}


