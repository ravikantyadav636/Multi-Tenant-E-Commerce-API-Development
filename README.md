# Multi-Tenant E-Commerce API Documentation

# Project Overview

This project is a backend API for a multi-tenant e-commerce system designed using Node.js, Express.js, and MongoDB. It enables vendors to:

Register and manage their accounts.

Add, update, delete, and list their products.

Handle orders placed for their products.

The system ensures secure and efficient handling of multiple vendors, with each vendor having access only to their own data.

Features

1. Vendor Management

Vendors can register and log in.

JWT-based authentication is implemented for secure access.

Vendors can only manage their own products and orders.

2. Product Management

Vendors can add, update, delete, and list their products.

Pagination is implemented for efficient product listing.

3. Order Management

Vendors can view orders for their products.

Vendors can mark orders as "shipped."

Prerequisites

Node.js (v14+)

MongoDB (local or cloud instance)

Postman or any API testing tool

Setup Instructions

1.Clone the Repository:

git clone <repository-url>
cd multi-tenant-ecommerce-api

2.Install Dependencies:

npm install

3.Configure Environment Variables:Create a .env file in the root directory and add the following:

MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret Key>
PORT=5000

4.Run the Server:

npm run dev

The server will start at http://localhost:5000.

API Endpoints

Authentication

1. POST /api/vendors/register

Purpose: Vendor registration.

Request Body:

{
  "name": "Vendor Name",
  "email": "vendor@example.com",
  "password": "securepassword"
}

Response:

{
  "message": "Vendor registered successfully."
}

2. POST /api/vendors/login

Purpose: Vendor login.

Request Body:

{
  "email": "vendor@example.com",
  "password": "securepassword"
}

Response:

{
  "token": "JWT_TOKEN"
}

Product Management

3. POST /api/products

Purpose: Add a new product.

Headers:

Authorization: Bearer <JWT_TOKEN>

Request Body:

{
  "name": "Product Name",
  "price": 100,
  "stock": 50
}

Response:

{
  "message": "Product added successfully."
}

4. GET /api/products?page=1&limit=10

Purpose: List all products (paginated).

Headers:

Authorization: Bearer <JWT_TOKEN>

Response:

{
  "products": [
    {
      "_id": "product_id",
      "name": "Product Name",
      "price": 100,
      "stock": 50,
      "createdAt": "2024-12-01T12:00:00Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 10
}

5. PUT /api/products/:id

Purpose: Update product details.

Headers:

Authorization: Bearer <JWT_TOKEN>

Request Body:

{
  "name": "Updated Product Name",
  "price": 150,
  "stock": 30
}

Response:

{
  "message": "Product updated successfully."
}

6. DELETE /api/products/:id

Purpose: Delete a product.

Headers:

Authorization: Bearer <JWT_TOKEN>

Response:

{
  "message": "Product deleted successfully."
}

Order Management

7. GET /api/orders

Purpose: List all orders for the vendor’s products.

Headers:

Authorization: Bearer <JWT_TOKEN>

Response:

{
  "orders": [
    {
      "_id": "order_id",
      "product": "Product Name",
      "quantity": 2,
      "status": "pending",
      "createdAt": "2024-12-01T12:00:00Z"
    }
  ]
}

8. PUT /api/orders/:id

Purpose: Mark an order as shipped.

Headers:

Authorization: Bearer <JWT_TOKEN>

Request Body:

{
  "status": "shipped"
}

Response:

{
  "message": "Order status updated to shipped."
}

Security

All routes are protected using JWT authentication.

Vendors can access only their own data (products and orders).

Data validation is handled using Joi or express-validator.

Additional Features

Pagination: Implemented for product listing to improve performance.

Error Handling: Graceful handling of errors with appropriate HTTP status codes.

MongoDB Optimization: Indexes are added for faster queries.

Deliverables

Source Code:

Hosted on GitHub with proper folder structure and comments.

Postman Collection:

Exported Postman collection for all endpoints.

Documentation:

This document (README.md).
