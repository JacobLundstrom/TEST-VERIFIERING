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
    }
}
