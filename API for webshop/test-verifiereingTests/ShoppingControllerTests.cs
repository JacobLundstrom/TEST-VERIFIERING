using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using test_verifiering;
using test_verifiering.Controllers;

namespace test_verifiereingTests
{
    [TestClass]
    public class ShoppingControllerTests
    {
        private ShoppingController shoppingController;

        [TestInitialize]
        public void Setup()
        {
            shoppingController = new ShoppingController();
        }

        [TestCleanup()]
        public void Cleanup()
        {
            ShoppingController.shoppingCart = new();
        }

        [TestMethod]
        public void DeleteAllProductsFromCart_ShouldDeleteAllProductsOfType()
        {
            // Arrange
            var productNameToDelete = "ProductToDelete";
            var productPrice = 9.99f;

            shoppingController.AddProductToCart(productNameToDelete, productPrice);
            shoppingController.AddProductToCart("Product1", 19.99f);
            shoppingController.AddProductToCart("Product2", 29.99f);

            // Act
            var response = shoppingController.DeleteAllProductsFromCart(productNameToDelete, productPrice);

            // Assert
            Assert.IsInstanceOfType(response, typeof(OkObjectResult));
            Assert.AreEqual($"Alla {productNameToDelete} blev borttagna ur kundvagnen", (response as OkObjectResult)?.Value);
           
            var remainingProducts = ShoppingController.shoppingCart.GetProducts();
            Assert.AreEqual(2, remainingProducts.Count);
            Assert.IsFalse(remainingProducts.Any(p => p.Name == productNameToDelete && p.Price == productPrice));
        }

        [TestMethod]
        public void AddProductToCart_ShouldAddProductToCart()
        {
            // Arrange
            ShoppingCart shoppingCart = new ShoppingCart();
            ShoppingController shoppingController = new ShoppingController();

            // Act
            shoppingController.AddProductToCart("TestProduct", 9.99f); // Assuming a simplified method that adds a product directly

            // Assert
            List<Product> productsInCart = ShoppingController.shoppingCart.GetProducts();
            Assert.AreEqual(1, productsInCart.Count); // Check that one product is added
            Assert.AreEqual("TestProduct", productsInCart[0].Name); // Check the name of the added product
            Assert.AreEqual(9.99f, productsInCart[0].Price); // Check the price of the added product
        }

        [TestMethod]
        public void DeleteOneProductFromCart_ShouldDeleteProduct()
        {
            // Arrange
            var productName = "TestProduct";
            var productPrice = 9.99f;

            // Add a product to the cart
            shoppingController.AddProductToCart(productName, productPrice);

            // Act
            var response = shoppingController.DeleteOneProductFromCart(productName, productPrice);

            // Assert
            Assert.IsInstanceOfType(response, typeof(OkObjectResult));
            Assert.AreEqual($"En {productName} blev borttagen från kundvagnen", (response as OkObjectResult)?.Value);
   
            var productsInCart = ShoppingController.shoppingCart.GetProducts();
            Assert.AreEqual(0, productsInCart.Count);
        }

        [TestMethod]
        public void DeleteOneProductFromCart_ShouldReturnNotFoundForNonexistentProduct()
        {
            // Arrange
            var nonExistentProductName = "NonExistentProduct";
            var nonExistentProductPrice = 19.99f;

            // Act
            var response = shoppingController.DeleteOneProductFromCart(nonExistentProductName, nonExistentProductPrice);

            // Assert
            Assert.IsInstanceOfType(response, typeof(NotFoundObjectResult));
            Assert.AreEqual($"Produkten {nonExistentProductName} med priset {nonExistentProductPrice} hittades inte i kundvagnen", (response as NotFoundObjectResult)?.Value);

            // Verify that the cart remains unchanged
            var productsInCart = ShoppingController.shoppingCart.GetProducts();
            Assert.AreEqual(0, productsInCart.Count);
        }

        
    }
}