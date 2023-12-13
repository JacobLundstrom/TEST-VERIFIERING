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
        public void TestMethod1()
        {
        }
    }
}