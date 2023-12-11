using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860



namespace test_verifiering.Controllers
{  
    [ApiController]
    [Route("api/[controller]")]
    public class ShoppingController : ControllerBase
    {
        private static ShoppingCart shoppingCart = new ShoppingCart();
      
        public ShoppingController()
        {
            
        }
        
        [HttpGet("products")]
        public IActionResult GetProductsInCart()
        {
            var products = shoppingCart.GetProducts();
            string jsonstring = "[";
            foreach(var product in products)
            {
                string mattias = $"\n{{\"name\":\"{product.Name}\", \"price\":{product.Price}}},";
                jsonstring += mattias;
            }
            jsonstring = jsonstring.TrimEnd(',') + "\n]";
            return Ok(jsonstring);
        }

        [HttpPost("add")]
        public IActionResult AddProductToCart([FromQuery(Name = "name")] string name, [FromQuery(Name = "price")] float price) 
        {
            var product = new Product(name, price);
            shoppingCart.AddProductToCart(product);
            return Ok("Produkten lades till i kundvagnen");
        }
       
        [HttpDelete("delete/{productName}")]
        public IActionResult DeleteAllProductsFromCart(string productName, float price)
        {
            var productToDelete = new Product (productName, price);
            shoppingCart.DeleteAllProductsFromCart(productToDelete);
            return Ok($"Alla {productName} blev borttagna ur kundvagnen");
        }

        [HttpDelete("deleteone/{productName}")]
        public IActionResult DeleteOneProductFromCart(string productName, float price)
        {
            var productToDelete = shoppingCart.GetProducts().FirstOrDefault(p => p.Name == productName && p.Price == price);

            if (productToDelete != null)
            {
                shoppingCart.DeleteOneProductFromCart(productToDelete);
                return Ok($"En {productName} blev borttagen från kundvagnen");
            }
            else
            {
                return NotFound($"Produkten {productName} med priset {price} hittades inte i kundvagnen");
            }
        }
    }
}
