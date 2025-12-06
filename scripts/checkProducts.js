require("dotenv").config();
const { contractInstance } = require("../contract");

(async () => {
  try {
    const allProducts = await contractInstance.getAllProducts();
    console.log(" Blockchain products found:");
    console.log(allProducts);
  } catch (err) {
    console.error(" Error fetching blockchain products:", err);
  } finally {
    process.exit(0);
  }
})();
