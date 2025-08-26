### SBA 13: Integrating a Database

A RESTful API for managing products inventory, built with Node.js, Express, and MongoDB/Mongoose.

---

#### Features

- Create new product records
- Read all products or a specific product by ID
- Update existing product information
- Delete products from the collection
- Data validation and error handling

---

#### Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- Body-parser middleware

---

#### Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/urmee04/product-inventory-api.git
```

`cd product-inventory-api`

2. Install dependencies:

   `npm install`

3. Set up environment variables:

   - Create a .env file in the root directory

4. Add your MongoDB connection string:

   `MONGODB_URI=<your-connection-string-here>`
   `PORT=3000`

5. Start the server:

   `npm start`

---

#### Project Structure

```bash
product-inventory-api/
├── config/
│ └── connection.js # database connection logic
│
├── models/ # mongoose models will go here
│ └── Products.js
│
├── routes/ # express route handlers will go here
│ └── productRoutes.js
│
├── server.js # entry point of the app
├── .env # environment variables (MongoDB URI, PORT, etc.)
├── .gitignore # ignore node_modules and .env
├── package.json
└── package-lock.json
```

---

#### Error Handling

The API returns appropriate HTTP status codes:

- 200: Success
- 201: Resource created successfully
- 400: Bad request (validation error)
- 404: Resource not found
- 500: Internal server error

#### Product API Endpoints

This document outlines the available endpoints for the Product API.

Base URL: /api/products

**1. POST - Create a New Product**

- Use Case: Add a new product to the inventory.
- Method: POST
- URL: http://localhost:3000/api/products
- Body: Select "raw" and "JSON" from the dropdown menus.
- Enter the product data in JSON format.
- Click "Send".
- Expected Response:`Status: 201 Created`

**2. GET - Get All Products (with Filtering, Sorting, Pagination)**

- Use Case: Retrieve a list of products. Supports advanced querying.
- Method: GET
- URL: http://localhost:3000/api/products
- Basic: Just get the first page of all products.
- Filter by Category & Price: http://localhost:3000/api/products?category=electronics&minPrice=50&maxPrice=200
- Search by Name: http://localhost:3000/api/products?search=wireless
- Sort by Price (High to Low): http://localhost:3000/api/products?sortBy=price_desc
- Pagination (Page 2, 5 items per page): http://localhost:3000/api/products?page=2&limit=5
- Combination: http://localhost:3000/api/products?category=electronics&minPrice=100&sortBy=price_desc&page=1&limit=3
- Click "Send".
- Expected Response (Status: 200 OK)

**3. GET by ID - Get a Single Product**

- Use Case: Retrieve the details of a specific product.
- Method: GET
- URL: http://localhost:3000/api/products/your_copied_id
- Click "Send".
- Expected Response: Success (200 OK): 
- The complete JSON object for the requested product.
 `Not Found (404 Not Found): { "error": "Product not found" }`
 `Invalid ID (400 Bad Request): { "error": "Invalid product ID" }`

**4. PUT - Update a Product (Full Update)**

- Use Case: Replace all data for a specific product. You must provide all required fields.
- Method: PUT
- URL: http://localhost:3000/api/products/your_copied_id
- Body: Select "raw" and "JSON". Provide the complete product data.
- Click "Send".
- Expected Response: 
`Success (200 OK)`

**5. DELETE - Delete a Product**

- Use Case: Remove a product from the inventory.
- Method: DELETE
- URL: http://localhost:3000/api/products/your_copied_id
- Click "Send".
- Expected Response:
`Success (200 OK): { "message": "Product deleted successfully" }`
`Not Found (404 Not Found): { "error": "Product not found" }`
- Verification: After a successful delete, making a GET request to view all products will no longer include the deleted item.

#### References


My primary resource for completing the lab was the code from our class lessons and materials. Additionally, I used the resources mentioned below to deepen my understanding of the concepts and code flow

- [mongoose](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/mongoose)

- [mongoDB Bootcamp](https://generalmotors.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15065064#overview)

