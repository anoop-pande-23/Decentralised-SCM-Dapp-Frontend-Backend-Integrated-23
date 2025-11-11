// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract contractApi {
//     struct Product {
//         uint256 id;
//         string name;
//         uint256 price;
//         uint256 quantity;
//     }

//     address owner;
//     mapping(uint256 => Product) public products;
//     Product[] public productArray;
//     mapping(uint256 => uint256) private idToIndex; // tracks index in array

//     // 🔔 Events
//     event ProductAdded(uint256 id, string name, uint256 price, uint256 quantity);
//     event ProductUpdated(uint256 id, string name, uint256 price, uint256 quantity);
//     event ProductDeleted(uint256 id);

//     constructor() {
//         owner = msg.sender;
//     }

//     modifier onlyOwner() {
//         require(msg.sender == owner, "Only owner can call this");
//         _;
//     }

//     function setProduct(uint256 _id, string memory _name, uint256 _price, uint256 _quantity) public onlyOwner {
//         require(_id != 0, "ID cannot be 0");
//         require(products[_id].id == 0, "Product ID already exists");

//         Product memory product = Product(_id, _name, _price, _quantity);
//         products[_id] = product;
//         productArray.push(product);
//         idToIndex[_id] = productArray.length - 1;

//         emit ProductAdded(_id, _name, _price, _quantity);
//     }

//     function getProduct(uint256 _id) public view returns (string memory, uint256, uint256) {
//         require(products[_id].id != 0, "Product not available");
//         Product memory product = products[_id];
//         return (product.name, product.price, product.quantity);
//     }

//     function getAllProducts() public view returns (Product[] memory) {
//         return productArray;
//     }

//     function updateProduct(uint256 _id, string memory _name, uint256 _price, uint256 _quantity) public onlyOwner {
//         require(products[_id].id != 0, "Product not available");

//         Product memory updatedProduct = Product(_id, _name, _price, _quantity);
//         products[_id] = updatedProduct;
//         uint256 index = idToIndex[_id];
//         productArray[index] = updatedProduct;

//         emit ProductUpdated(_id, _name, _price, _quantity);
//     }

//     function deleteProduct(uint256 _id) public onlyOwner {
//         require(products[_id].id != 0, "Product not available");

//         uint256 index = idToIndex[_id];
//         uint256 lastIndex = productArray.length - 1;

//         if (index != lastIndex) {
//             Product memory lastProduct = productArray[lastIndex];
//             productArray[index] = lastProduct;
//             idToIndex[lastProduct.id] = index;
//         }

//         productArray.pop();
//         delete products[_id];
//         delete idToIndex[_id];

//         emit ProductDeleted(_id);
//     }
// }



pragma solidity ^0.8.0;

contract contractApi {
    struct Product {
        uint256 id;
        string name;
        uint256 price;
        uint256 quantity;
    }

    address owner;
    mapping(uint256 => Product) public products;
    Product[] public productArray;
    mapping(uint256 => uint256) private idToIndex; // tracks index in array

    // 🔔 Events
    event ProductAdded(uint256 id, string name, uint256 price, uint256 quantity);
    event ProductUpdated(uint256 id, string name, uint256 price, uint256 quantity);
    event ProductDeleted(uint256 id);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    // 🏗️ Add product to blockchain
    function setProduct(uint256 _id, string memory _name, uint256 _price, uint256 _quantity) public onlyOwner {
        require(_id != 0, "ID cannot be 0");
        require(products[_id].id == 0, "Product ID already exists");

        Product memory product = Product(_id, _name, _price, _quantity);
        products[_id] = product;
        productArray.push(product);
        idToIndex[_id] = productArray.length - 1;

        emit ProductAdded(_id, _name, _price, _quantity);
    }

    // 🧾 Fetch single product
    function getProduct(uint256 _id) public view returns (string memory, uint256, uint256) {
        require(products[_id].id != 0, "Product not available");
        Product memory product = products[_id];
        return (product.name, product.price, product.quantity);
    }

    // 📦 Fetch all products
    function getAllProducts() public view returns (Product[] memory) {
        return productArray;
    }

    // 🛠️ Update product
    function updateProduct(uint256 _id, string memory _name, uint256 _price, uint256 _quantity) public onlyOwner {
        require(products[_id].id != 0, "Product not available");

        Product memory updatedProduct = Product(_id, _name, _price, _quantity);
        products[_id] = updatedProduct;
        uint256 index = idToIndex[_id];
        productArray[index] = updatedProduct;

        emit ProductUpdated(_id, _name, _price, _quantity);
    }

    // ❌ Delete product
    function deleteProduct(uint256 _id) public onlyOwner {
        require(products[_id].id != 0, "Product not available");

        uint256 index = idToIndex[_id];
        uint256 lastIndex = productArray.length - 1;

        if (index != lastIndex) {
            Product memory lastProduct = productArray[lastIndex];
            productArray[index] = lastProduct;
            idToIndex[lastProduct.id] = index;
        }

        productArray.pop();
        delete products[_id];
        delete idToIndex[_id];

        emit ProductDeleted(_id);
    }

    // ===============================
    // 📜 Receipt Hash Verification (New)
    // ===============================
    mapping(uint256 => string) public documentHashes;
    event DocumentHashStored(uint256 productId, string hash);

    // ✅ Store receipt hash
    function storeDocumentHash(uint256 productId, string memory hash) public {
        documentHashes[productId] = hash;
        emit DocumentHashStored(productId, hash);
    }

    // ✅ Verify uploaded receipt hash
    function verifyDocumentHash(uint256 productId, string memory uploadedHash)
        public
        view
        returns (bool)
    {
        return keccak256(bytes(documentHashes[productId])) == keccak256(bytes(uploadedHash));
    }
}
