//http://makeup-api.herokuapp.com/api/v1/products.json

getProductData();

async function getProductData(products){

    try {
        const container = document.querySelector(".container");
        const loading = document.querySelector("#loading");
    
        if(!products){
            sessionStorage.clear();
            loading.classList.add("display");

    let data = await fetch("https://makeup-api.herokuapp.com/api/v1/products.json");
    
    products = await data.json();
    
    console.log(products);
    
    loading.classList.remove("display");

    }

    let currentPage = sessionStorage.getItem("currentPage");
    
    if (!currentPage){
        currentPage = 1;
        sessionStorage.setItem("currentPage", currentPage);
    }

    products.slice((currentPage-1)*9,currentPage*9).forEach((product) => {
        const card = `<div class="card">
        <img class="product-image" src='${product["api_featured_image"]}' alt='${product["name"]}'>
        <div class="card-content">
          <p class="product-brand">${product["brand"]}</p>
          <h3 class="product-name">${product["name"]}</h3>
          <p class="product-price">${product["price_sign"]}${product["price"]}</p>
            <a class="button" href='${product["product_link"]}' target="_blank"> BUY </a>
          <div class="product-description"><p>${product["description"]}</p></div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", card);

    const cardEventListener = document.querySelector(".card:last-child").addEventListener("click", function(){
        showModal(product);
    });

    const button = document.querySelector(".card:last-child .button");
    button.onclick = (event)=>{
        event.stopPropagation();
        return true;
    };
    });

    const navigation = document.createElement("div");
    navigation.className = "navigation";

    const previous = document.createElement("button");
    previous.classList.add("button", "previous");
    previous.innerHTML="Previous";
    previous.addEventListener("click",function(){
        previousPage(products);
    });

    const next = document.createElement("button");
    next.classList.add("button","next");
    next.innerHTML="Next";
    next.addEventListener("click",function(){
        nextPage(products);
    })

    navigation.append(previous, next);
    document.body.append(navigation);
}   catch (error){
    console.log("Reloading Erroor Occurred" + error);
    location.reload();
}
}



function nextPage(products) {
    const next = document.querySelector(".next");
    const currentPage = Number(sessionStorage.getItem("currentPage"));
    const totalPages = Math.ceil(products.length / 9);
  
    if (currentPage < totalPages) {
      clearPage();
  
      sessionStorage.setItem("currentPage", currentPage + 1);
      getProductData(products);
      upFunction();
    } else {
      disableButton(next);
    }
  }

  function previousPage(products) {
    const previous = document.querySelector(".previous");
    const currentPage = Number(sessionStorage.getItem("currentPage"));
  
    if (currentPage > 1) {
      clearPage();
  
      sessionStorage.setItem("currentPage", currentPage - 1);
      getProductData(products);
      upFunction();
    } else {
      disableButton(previous);
    }
  }

  function clearPage() {
    const container = document.querySelector(".container");
    const navigation = document.querySelector(".navigation");
  
    container.innerHTML = "";
    navigation.remove();
  }

  function upFunction() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
  }




