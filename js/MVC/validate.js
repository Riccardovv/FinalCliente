

class Validator{



  validateProduct(form){
    let serial=false;
    let name= false;
    let description = false;
    let price=false;
    let tax= false;
    let url = false;
    let category = false;



    form=form[0];
    $(form.npSerial).on('change', function () {
      if (form.npSerial.value != '') {
        serial = form.npSerial.value;
        $('#serialFeedback').html('<i class="bi bi-check-lg"></i>')
      }else{
        $('#serialFeedback').html('<div class="text-error"><i class="bi bi-exclamation-lg"></i> Serial is Needed</div>')
      }
      
      enableSendProduct()
    })


    $(form.npName).on('change', function () {
      
      if (form.npName.value != '') {
        name = form.npName.value;
        $('#nameFeedback').html('<i class="bi bi-check-lg"></i>')
      }else{
        $('#nameFeedback').html('<div class="text-error"><i class="bi bi-exclamation-lg"></i> Name is Needed</div>')
      }

      enableSendProduct()
    })

    $(form.npDescription).on('change', function () {

      
      if (form.npDescription.value != '') {
        description = form.npDescription.value;
        $('#descriptionFeedback').html('<i class="bi bi-check-lg"></i>')
      }else{
        $('#descriptionFeedback').html('<div class="text-error"><i class="bi bi-exclamation-lg"></i> Description  is Needed</div>')
      }

      enableSendProduct()
    })
    
    $(form.npPrice).on('change', function () {

      
      if (form.npPrice.value == '' ) {
        $('#preiceFeedback').html('<div class="text-error"><i class="bi bi-exclamation-lg"></i> Price is Needed</div>')
        

      }else{
        if (!isNaN(form.npPrice.value)) {
          price = form.npPrice.value;
          $('#priceFeedback').html('<i class="bi bi-check-lg"></i>')
        }else{
          $('#preiceFeedback').html('<div class="text-error"><i class="bi bi-exclamation-lg"></i> Price Must be a Number</div>')
        }
      }


      enableSendProduct()
    })


    $(form.npTax).on('change', function () {

      if (form.npTax.value == '' ) {
      
        $('#taxFeedback').html('<div class="text-error"><i class="bi bi-exclamation-lg"></i> Tax is Needed</div>')

      }else{
        if (!isNaN(form.npTax.value)) {
          tax = form.npTax.value;
          $('#taxFeedback').html('<i class="bi bi-check-lg"></i>')
        }else{
          $('#taxFeedback').html('<div class="text-error"><i class="bi bi-exclamation-lg"></i> Tax Must Be a Number</div>')
        }
      }
      enableSendProduct()
    })


    $(form.npUrl).on('change', function () {

      if (form.npUrl.value != '') {
        url = form.npUrl.value;
        $('#urlFeedback').html('<i class="bi bi-check-lg"></i>')
      }else{
        $('#urlFeedback').html('<div class="text-error"><i class="bi bi-exclamation-lg"></i> Url  is Needed</div>')
      }
      console.log(serial, name, description, price, tax, url);


      enableSendProduct()
    })


    function enableSendProduct() {
      if (serial && name && description && price && tax && url) {
        category = form.npCategory.value
        console.log(category);
        //this.#model.addProduct(new Product(serial,name,description,price,tax,url), this.#model.getCategoryByTitle(category))
        $(form.loadProduct).removeAttr('disabled');
      }
      
    }

  }


  validateCategory(form){



    let title = false;
    let catDesc = false;



    form=form[0];
    $(form.ncTitle).on('change', function () {
      if (form.ncTitle.value != '') {
        title = form.ncTitle.value;
        $('#titleFeedback').html('<i class="bi bi-check-lg"></i>')
      }else{
        $('#titleFeedback').html('<div class="text-error"><i class="bi bi-exclamation-lg"></i> Title is Needed</div>')
      }
      
      enableSendCategory()
    })


    $(form.ncDescription).on('change', function () {
      console.log('desccccccccccccccc');
      if (form.ncDescription.value != '') {
        catDesc = form.ncDescription.value;
        $('#descriptionFeedback').html('<i class="bi bi-check-lg"></i>')
      }else{
        $('#descriptionFeedback').html('<div class="text-error"><i class="bi bi-exclamation-lg"></i> Description is Needed</div>')
      }

      enableSendCategory()
    })




    function enableSendCategory() {
      if (title && catDesc) {

        console.log(title);
        //this.#model.addProduct(new Product(serial,name,description,price,tax,url), this.#model.getCategoryByTitle(category))
        $(form.loadCategory).removeAttr('disabled');
      }
      
    }

  }


  validateStore(form){

    let cif = false;
    let name = false;
    let adress = false;
    let phone = false;



    form=form[0];
    $(form.nsCif).on('change', function () {
      if (form.nsCif.value != '') {
        cif = form.nsCif.value;
        $('#cifFeedback').html('<i class="bi bi-check-lg"></i>')
      }else{
        $('#cifFeedback').html('<div class="text-error"><i class="bi bi-exclamation-lg"></i> CIF is Needed</div>')
      }
      
      enableSendCategory()
    })


    $(form.nsName).on('change', function () {
      console.log('desccccccccccccccc');
      if (form.nsName.value != '') {
        name = form.nsName.value;
        $('#nameFeedback').html('<i class="bi bi-check-lg"></i>')
      }else{
        $('#nameFeedback').html('<div class="text-error"><i class="bi bi-exclamation-lg"></i> Name is Needed</div>')
      }

      enableSendCategory()
    })


    $(form.nsAdress).on('change', function () {
      console.log('desccccccccccccccc');
      if (form.nsAdress.value != '') {
        adress = form.nsAdress.value;
        $('#adressFeedback').html('<i class="bi bi-check-lg"></i>')
      }else{
        $('#adressFeedback').html('<div class="text-error"><i class="bi bi-exclamation-lg"></i> Adress is Needed</div>')
      }

      enableSendCategory()
    })




    $(form.nsPhone).on('change', function () {
      console.log('desccccccccccccccc');
      if (form.nsPhone.value != '') {
        phone = form.nsPhone.value;
        $('#phoneFeedback').html('<i class="bi bi-check-lg"></i>')
      }else{
        $('#phoneFeedback').html('<div class="text-error"><i class="bi bi-exclamation-lg"></i> Phone is Needed</div>')
      }

      enableSendCategory()
    })




    function enableSendCategory() {
      if (cif && name && adress && phone) {

        console.log(cif);
        //this.#model.addProduct(new Product(serial,name,description,price,tax,url), this.#model.getCategoryByTitle(category))
        $(form.loadStore).removeAttr('disabled');
      }
      
    }




  }





};


export default Validator;