import StoreHouse from "./StoreHouse.js";



class StoreView{
  constructor() {

      if (StoreView.hasOwnProperty('singleton'))
          return StoreView.singleton;
      Object.defineProperty(StoreView, 'singleton',{
          value: this,
          enumerable:false,
          writable:false,
          configurable:false
      });
      this.content=$('#content')
    this.gotoStores = $('#gotoStores');
    this.gotoProducts = $('#gotoProducts');
    this.storeButtons= $(document).find('button');
    console.log(this.ventanas)
      
  }



  #excecuteHandler(
    handler, handlerArguments, scrollElement, data, url, event){
    handler(...handlerArguments);
    $(scrollElement).get(0).scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
    }




  
  init(validator, init){
    this.content.empty();
    $('#carouselExampleIndicators').show();
    this.login(validator, init);
    console.log('init');
  }

	bindInit(handler){
    $('#init').click((event) => {
    this.#excecuteHandler(handler, [], 'body', {action: 'init'}, '#', event);
    });
    $('#logo').click((event) => {
    this.#excecuteHandler(handler, [], 'body', {action: 'init'}, '#', event);
    });
    }
  
 
  showStores(storesIterator){
    let count=0;
    console.log('entra');
    this.content.empty();
    $('#carouselExampleIndicators').hide();
      for (const s of storesIterator) {
        console.dir(s)
        let btn = $('<a href="#" class="btn btn-primary" data-position="'+count++ +'">View Products</a>');
        $('#content').append(`<div class="card m-3" style="width: 18rem;">
                <img src=".\\assets\\img\\stores\\store.jpg" class="card-img-top" alt="...">
                <div class="card-body" id="card-body">
                <h5 class="card-title">`+s.adress+`</h5>
                <p class="card-text">`+s.CIF+`</p>
                </div>
                </div>`);
                
        $('.card-body').last().append(btn);  

      } 
  }

  bindShowStoreProducts(handler){
    $('.btn-primary').click((event) => {
      console.log('ver pord');
      this.#excecuteHandler(
      handler, [event], 'body',{action: 'ShowStoreProducts'}, 'Productos', event
      );
      });
  }


  bindOpenWindow(handler,product,ventanas){
    $('.btn-primary').click((event) => {
      this.#excecuteHandler(
      handler, [event,product,ventanas], 'body',
      {action: 'bindShowStoreProducts'}, event.target.name, event
      );
      });
  }




  showProductInWindow(product,ventanas){
    
    let win=window.open("product.html", "Mywindow", "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");
    ventanas.push(win);
      $(win).on('DOMContentLoaded',function(){
        let content=win.document.getElementById('content');
        $(content).append(`<div class="card m-3" style="width: 18rem;">
                <img src="`+product[0].image+`" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">`+product[0].name+`</h5>
                <p class="card-text">`+product[0].description+`</p>
                </div>
                </div>`
        );
      })
  }



  showProducts(products){
    this.content.empty()
    $('#carouselExampleIndicators').hide();
      for (const p of products) {
        $('#content').append(`<div class="card m-3" style="width: 18rem;">
                <img src="`+p.image+`" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">`+p.name+`</h5>
                <p class="card-text">`+p.description+`</p>
                <p class="card-text lead">`+p.price+`€</p>
                <a href="#" class="btn btn-primary" data-name="${p.name}">Open New Window</a>
                <a href="#" class="btn btn-warning" data-name="${p.name} id">Mark As Favorite</a>
                </div>
                </div>`
        );

      }
  }




  addProduct(categories,validator,load){
    this.content.empty()
    $('#carouselExampleIndicators').hide();
      this.content.append(`<form name="fNewProduct" role="form" id="fNewProduct" novalidate class="container">
      <div class="form-row">
        <div class="col-md-12 mb-3">
          <label for="npSerial">Número de serie *</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="serialPrepend"><i class="bi bi-nut"></i></span>
            </div>
            <input type="text" class="form-control" id="npSerial" name="npSerial" placeholder="Número de serie" aria-describedby="serialPrepend" value="" required><div id="serialFeedback"></div>
            <div class="invalid-feedback">El número de serie es obligatorio.</div>
            <div class="valid-feedback">Correcto.</div>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="col-md-6 mb-3">
          <label for="npName">Nombre *</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="brandPrepend"><i class="bi bi-pen"></i></span>
            </div>
            <input type="text" class="form-control" id="npName" name="npName" placeholder="Nombre" aria-describedby="brandPrepend" value="" required><div id="nameFeedback"></div>


          </div>
        </div>

          <div class="col-md-6 mb-3">
          <label for="npDescription">Descripcion *</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="modelPrepend"><i class="bi bi-phone"></i></span>
            </div>
            <input type="text" class="form-control" id="npDescription" name="npDescription" placeholder="Descripcion" aria-describedby="modelPrepend" value="" required><div id="descriptionFeedback"></div>


          </div>
        </div>
      </div>
     



      <div class="form-row">
        <div class="col-md-3 mb-3">
          <label for="npPrice">Precio *</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="pricePrepend"><i class="bi bi-currency-euro"></i></span>
            </div>
            <input type="number" class="form-control" id="npPrice" name="npPrice" min="0" step="10" placeholder="Precio" aria-describedby="pricePrepend" value="" required><div id="priceFeedback"></div>

          </div>
        </div>




        
        <div class="col-md-3 mb-3">
          <label for="npTax">Porcentaje de impuestos</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="taxPrepend"><i class="bi bi-percent"></i></span>
            </div>
            <input type="number" class="form-control" id="npTax" name="npTax" min="0" step="1" placeholder="21%" aria-describedby="taxPrepend" value="" required><div id="taxFeedback"></div>

          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="npUrl">URL Imagen *</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="urlPrepend"><i class="bi bi-image"></i></span>
            </div>
            <input type="url" class="form-control" id="npUrl" name="npUrl" placeholder="http://www.test.es" aria-describedby="urlPrepend" value="" required><div id="urlFeedback"></div>

          </div>
        </div>
      </div>


      <div class="col-md-6 mb-3">
      <label for="npCategory">Category *</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="modelPrepend"><i class="bi bi-list"></i></span>
        </div>
        <select id=npCategory name=npCategory>

        <div id="descriptionFeedback"></div>

        </div>
        </div>
      </div>

      
      </form>
`)
for (const cat of categories) {
  $('#npCategory').append(`<option value="${cat.title}">${cat.title}</option>`)
}

$('#npCategory').parent().append(`<button class="btn btn-primary m-1 w-25" type="" id="loadProduct" name="loadProduct" disabled>Enviar</button>
<button class="btn btn-primary m-1 w-25" type="reset"   onClick=loger >Cancelar</button>`)
validator($('#fNewProduct'));

$('#loadProduct').click(function(e){
  e.preventDefault();

  load($('#fNewProduct'))
  $('#fNewProduct').html('')
  $('#content').append('<div class="text-success"><i class="bi bi-check-lg"></i> Producto Añadido Correctamente</div>')
})

}





addCategory(validator,load){
  this.content.empty()
  $('#carouselExampleIndicators').hide();
    this.content.append(`<form name="fNewCategory" role="form" id="fNewCategory" novalidate class="container">
    <div class="form-row">
      <div class="col-md-12 mb-3">
        <label for="ncTitle">Titulo *</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="serialPrepend"><i class="bi bi-nut"></i></span>
          </div>
          <input type="text" class="form-control" id="ncTitle" name="ncTitle" placeholder="Titulo de la Categoria" aria-describedby="serialPrepend" value="" required><div id="titleFeedback"></div>

        </div>
      </div>
    </div>

    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="ncDescription">Descripcion *</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="brandPrepend"><i class="bi bi-pen"></i></span>
          </div>
          <input type="text" class="form-control" id="ncDescription" name="ncDescription" placeholder="Descripcion de la categoria" aria-describedby="brandPrepend" value="" required><div id="descriptionFeedback"></div>


        </div>
      </div>

        
      <button class="btn btn-primary m-1 w-25" type="" id="loadCategory" name="loadCategory" disabled>Enviar</button>
      <button class="btn btn-primary m-1 w-25" type="reset"   onClick=loger >Cancelar</button>
    
    </form>
`)



validator($('#fNewCategory'));

$('#loadCategory').click(function(e){
e.preventDefault();

load($('#fNewCategory'))
$('#fNewCategory').html('')
$('#content').append('<div class="text-success"><i class="bi bi-check-lg"></i> Categoría Añadida Correctamente</div>')
})

}





addStore(validator,load){
  this.content.empty()
  $('#carouselExampleIndicators').hide();
    this.content.append(`<form name="fNewStore" role="form" id="fNewStore" novalidate class="container">
    <div class="form-row">
      <div class="col-md-12 mb-3">
        <label for="nsCif">CIF *</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="serialPrepend"><i class="bi bi-nut"></i></span>
          </div>
          <input type="text" class="form-control" id="nsCif" name="nsCif" placeholder="CIF" aria-describedby="serialPrepend" value="" required><div id="cifFeedback"></div>
          <div class="invalid-feedback">El número de serie es obligatorio.</div>
          <div class="valid-feedback">Correcto.</div>
        </div>
      </div>
    </div>

    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="nsName">Nombre *</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="brandPrepend"><i class="bi bi-pen"></i></span>
          </div>
          <input type="text" class="form-control" id="nsName" name="nsName" placeholder="Nombre" aria-describedby="brandPrepend" value="" required><div id="nameFeedback"></div>
        </div>
      </div>

        <div class="col-md-6 mb-3">
        <label for="nsAdress">Adress *</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="modelPrepend"><i class="bi bi-signpost"></i></span>
          </div>
          <input type="text" class="form-control" id="nsAdress" name="nsAdress" placeholder="Adress" aria-describedby="modelPrepend" value="" required><div id="adressFeedback"></div>
        </div>
      </div>
    </div>
   



    <div class="form-row">
      <div class="col-md-3 mb-3">
        <label for="nsPhone">Phone *</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="pricePrepend"><i class="bi bi-phone"></i></span>
          </div>
          <input type="number" class="form-control" id="nsPhone" name="nsPhone" min="0" step="10" placeholder="Phone" aria-describedby="pricePrepend" value="" required><div id="phoneFeedback"></div>

        </div>
      </div>


    <button class="btn btn-primary m-1 w-25" type="" id="loadStore" name="loadStore" disabled>Enviar</button>
    <button class="btn btn-primary m-1 w-25" type="reset"   onClick=loger >Cancelar</button>
  

    
    </form>
`)



validator($('#fNewStore'));

$('#loadStore').click(function(e){
e.preventDefault();
load($('#fNewStore'))
$('#fNewStore').html('')
$('#content').append('<div class="text-success"><i class="bi bi-check-lg"></i> tienda Añadida Correctamente</div>')
})

}


deleteStore(stores,deleteFunc){
  this.content.empty()
  $('#carouselExampleIndicators').hide();

  this.content.append(`
  <form name="deleteS" role="form" id="deleteS" novalidate class="container">

  <div class="col-md-6 mb-3">
      <label for="dStore">Store</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="modelPrepend"><i class="bi bi-list"></i></span>
        </div>
        <select id=dStore name=dStore>

        <div id="descriptionFeedback"></div>

        </div>
        </div>
      </div>

  </form>
  `);
  
  for (const s of stores.values()) {
    $('#dStore').append(`<option value="${s.CIF}">CIF: ${s.CIF}  Name:${s.name}</option>`)
  }
  $('#dStore').parent().append('<button class="btn btn-danger m-1 w-25" type="" id="delete" name="delete" >Borrar</button>')

  $('#delete').click(function (e) {
    e.preventDefault();
    deleteFunc($('dStore').val());
    $('#deleteS').html('')
    $('#content').append('<div class="text-success"><i class="bi bi-check-lg"></i> tienda Borrada Correctamente</div>')
  })

}







deleteCategory(categories,deleteFunc){
  this.content.empty()
  $('#carouselExampleIndicators').hide();

  this.content.append(`
  <form name="deleteC" role="form" id="deleteC" novalidate class="container">

  <div class="col-md-6 mb-3">
      <label for="dCategory">Category</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="modelPrepend"><i class="bi bi-list"></i></span>
        </div>
        <select id=dCategory name=dCategory>
        </select>
        <div id="descriptionFeedback"></div>

        </div>
        </div>
      </div>

  </form>
  `);
  
  for (const c of categories) {
    $('#dCategory').append(`<option value="${c.title}">Titulo: ${c.title}</option>`)
  }
  $('#dCategory').parent().append('<button class="btn btn-danger m-1 w-25" type="" id="delete" name="delete" >Borrar</button>')

  $('#delete').click(function (e) {
    e.preventDefault();
    deleteFunc(document.getElementById('dCategory').value);
    $('#deleteC').html('')
    $('#content').append('<div class="text-success"><i class="bi bi-check-lg"></i> Categoria Borrada Correctamente</div>')
  })

}





deleteProduct(products,deleteFunc){
  this.content.empty()
  $('#carouselExampleIndicators').hide();

  this.content.append(`
  <form name="deleteP" role="form" id="deleteP" novalidate class="container">

  <div class="col-md-6 mb-3">
      <label for="dProduct">Category</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="modelPrepend"><i class="bi bi-list"></i></span>
        </div>
        <select id=dProduct name=dProduct>
        </select>
        <div id="descriptionFeedback"></div>

        </div>
        </div>
      </div>

  </form>
  `);
  
  for (const p of products) {
    $('#dProduct').append(`<option value="${p.name}">Nombre Producto: ${p.name}</option>`)
  }
  $('#dProduct').parent().append('<button class="btn btn-danger m-1 w-25" type="" id="delete" name="delete" >Borrar</button>')

  $('#delete').click(function (e) {
    e.preventDefault();
    deleteFunc(document.getElementById('dProduct').value);
    $('#deleteP').html('')
    $('#content').append('<div class="text-success"><i class="bi bi-check-lg"></i> Producto Borrada Correctamente</div>')
  })

}



  login(validateFunc, inicio){
    if (localStorage.getItem('user') == 'admin') {
      $('#login').attr('data-user','admin')
      $('#login').html('Hola Admin')
    }else{
      if ($('#login').attr('data-user') != 'admin') {
        this.content.empty()
        $('#carouselExampleIndicators').hide();
  
        this.content.append(`
        <form class="form-inline" name="loginForm" id="loginForm">
          <label class="sr-only" for="inlineforminput">Username</label>
          <div class="input-group mb-2 me-sm-2 mb-sm-0">
              <div class="input-group"></div>
              <input type="text" class="form-control" id="user" placeholder="Username">
          </div>
          <label class="sr-only" for="inlineform">Password</label>
          <input type="password" class="form-control mb-2 me-sm-2 mb-sm-0" id="pass" placeholder="Enter Password">
          <div class="form-check mb-2 me-sm-2 mb-sm-0">
              
          </div>
          <button type="submit" class="btn btn-info" id="validarUser">Login</button>
      </form>
        `)
    }

    }
    if ($('#loginForm')) {
      $('#validarUser').on('click', function(e){
        e.preventDefault();
        console.log($('#user').val());
        if (validateFunc($('#user').val(),$('#pass').val() )) {
          $('#login').attr('data-user','admin')
          inicio();
          localStorage.setItem('user', 'admin')
          
        }
      })
    }

  }







  logout(inicio){
    console.log('remove');
    localStorage.removeItem('user')
    $('#login').attr('data-user','')
    $('#login').html('Log In')
    inicio()

  }


  favs(products){
    console.log('favs');
  }



  closeWindows(ventanas){
    console.log('cerrar');
    ventanas.forEach(function (vent) {
      vent.close();
    })
  }


  bindFavs(handler){
    $('#favs').click(handler)
  }

  bindLogin(handler){
    
    $('#login').click(handler);
    this.handle
  }


  bindLogout(handler){
    
    $('#logout').click(handler);
  }

  bindAddProduct(handler){
    
    $('#addProduct').click(handler);
  }

  bindAddCategory(handler){
    
    $('#addCategory').click(handler);
  }

  bindAddStore(handler){
    
    $('#addStore').click(handler);
  }



  bindDeleteStore(handler){
    
    $('#deleteStore').click(handler);
  }
  bindDeleteCategory(handler){
    
    $('#deleteCategory').click(handler);
  }
  bindDeleteProduct(handler){
    
    $('#deleteProduct').click(handler);
  }




  bindCloseWindows(handler,ventanas){
    console.log('cerrar');
    $('#closeWindows').click(handler,ventanas)
  }


  
  bindShowStores(handler){
    this.gotoStores.click((event) => {
      this.#excecuteHandler(
      handler, [], 'body',
      {action: 'showStores'}, '#stores', event
      );
      });
  }



  bindShowCategories(handler){
    $('#gotoCategories').click((event) => {
      console.log('ver cat');
      this.#excecuteHandler(
      handler, [event], 'body',
      {action: 'ShowCategories'}, '#categories', event
      );
      });
  }



  bindShowCategoryProducts(handler){
    $('.btn-primary').click((event) => {
      console.log('ver pord cat');
      this.#excecuteHandler(
      handler, [event], 'body',
      {action: 'ShowStoreProducts'}, '#CategoryProducts', event
      );
      });
  }

 

  bindShowProducts(handler){
    this.gotoProducts.click((event) => {
      console.log('ver pord');
      this.#excecuteHandler(
      handler, [event], 'body',
      {action: 'ShowProducts'}, '#products', event
      );
      });
  }





  showCategories(categories){
    this.content.empty()
    $('#carouselExampleIndicators').hide();
      for (const c of categories) {
        let btn = $('<a href="#" class="btn btn-primary" data-title="'+c.title +'">View Products</a>');
        $('#content').append(`<div class="card m-3" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">`+c.title+`</h5>
                <p class="card-text">`+c.description+`</p>
                </div>
                </div>`
        );
        $('.card-body').last().append(btn);
      }
  }




}
  export default StoreView;