namespace test_verifiering
{
    public class ShoppingCart
    {
        List<Product> products;

        public ShoppingCart()
        {
            products = new List<Product>();
        }

        public void AddProductToCart(Product product)
        {
            products.Add(product);
        }

        public void DeleteAllProductsFromCart(Product product)
        {
             products.RemoveAll(p => p.Name == product.Name && p.Price == product.Price);
        }

        public void DeleteOneProductFromCart(Product product)
        {
            products.Remove(product);
        }

        public List<Product> GetProducts()
        {
            return products;
        }
    }
}
