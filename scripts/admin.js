$(() => {
    var products = getProducts();
    console.log(products);
    showProducts(products);
    $("#f").submit((ev) => {
      ev.preventDefault();
      products=getProducts();
      
      var product = {
        id: products.length + 1,
        name: $("#name").val(),
        price: $("#price").val(),
        description: $("#desc").val(),
      };
      var f = document.getElementById("pic").files[0];
      var reader = new FileReader();
      reader.onload = () => {
        product.picture = reader.result;
        products.push(product);
        localStorage.setItem("product-list", JSON.stringify(products));
        $("#f").trigger('reset');
        products=getProducts();
        showProducts(products);
      };
      reader.readAsDataURL(f);
    });
  });
  function getProducts(){
    return localStorage.getItem("product-list") ? JSON.parse(localStorage.getItem("product-list")):[];
  }
  function showProducts(products){
    $("#tbody").empty();
    products.forEach(p=>{
        $("#tbody").append(`<tr>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td>${p.description}</td>
            </tr>`);
    });
  }