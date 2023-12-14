using System.Data.SqlTypes;

namespace test_verifiering
{
    public class Product
    {
        public string Name;
        public float Price;

        public Product(string name, float price)
        {
            Name = name;
            Price = price;
        }

        public override bool Equals(object? obj)
        {
            return obj is Product product &&
                   Name == product.Name &&
                   Price == product.Price;
        }
    }
}
