class Product {
    constructor(productId, productName, productPrice, productImg) {
    this.productId = productId;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productImg = productImg;
    }
   }
   
   const kamera = new Product(1, "Kamera", 599, "img/product-1.jpg");
   const shirt = new Product(2, "Tröja", 50);
   const lampa = new Product(3, "Lampa", 100);
   
   // Store all products in an object
   const products = {
    kamera: kamera,
    shirt: shirt,
    lampa: lampa
   };
   
   // Get the product name from the URL
   const urlParams = new URLSearchParams(window.location.search);
   const productName = urlParams.get('product');
   
   // Get the product
   const item = products[productName];
   
   // Display the product details
   document.querySelector('#productName').textContent = item.productName;
   document.querySelector('#productPrice').textContent = `$${item.productPrice}`;
   document.querySelector('#productImage').src = item.productImg;
   