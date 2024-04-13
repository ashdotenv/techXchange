# Quick API Guide

## All Products
- Endpoint: `/api/v1/products`
- **Filter Products**: `/api/v1/products`

## Filtering Options for Products

- **Price**: Filter products by price.
  - Use the `price` query parameter in the format `price=min-max`.
  - Example: `/api/v1/products?price=100-500` (Filters products with prices between 100 and 500).

- **Quantity**: Filter products by quantity.
  - Use the `quantity` query parameter in the format `quantity=min-max`.
  - Example: `/api/v1/products?quantity=5-10` (Filters products with quantities between 5 and 10).

- **Condition**: Filter products by condition.
  - Use the `condition` query parameter.
  - Example: `/api/v1/products?condition=Brand New` (Filters products with the "Brand New" condition).

- **Category**: Filter products by category.
  - Use the `category` query parameter.
  - Example: `/api/v1/products?category=Laptops` (Filters products in the "Laptops" category).

- **Brand**: Filter products by brand.
  - Use the `brand` query parameter.
  - Example: `/api/v1/products?brand=Apple` (Filters products with the brand "Apple").

- **Name**: Filter products by name.
  - Use the `name` query parameter.
  - Example: `/api/v1/products?name=iPhone` (Filters products with names containing "iPhone").

- **Location**: Filter products by location.
  - Use the `location` query parameter.
  - Example: `/api/v1/products?location=New York` (Filters products located in "New York").

- **Seller**: Filter products by seller.
  - Use the `seller` query parameter.
  - Example: `/api/v1/products?seller=JohnDoe` (Filters products sold by the seller with the name "JohnDoe").

- **Rating**: Filter products by rating.
  - Use the `rating` query parameter in the format `rating=min-max`.
  - Example: `/api/v1/products?rating=4-5` (Filters products with ratings between 4 and 5).

## Signup
- Endpoint: `/api/v1/signup`
- Parameters:
  - `username`: User's username (string, min length: 3, max length: 30)
  - `email`: User's email (string, must be a valid email address)
  - `password`: User's password (string, min length: 6)
  - `firstName`: User's first name (string, max length: 50)
  - `lastName`: User's last name (string, max length: 50)
  - `role`: User's role (either "Admin" or "User")

## Login
- Endpoint: `/api/v1/login`
- Parameters:
  - `username` or `email`: User's username or email (string, min length: 3, max length: 100)
  - `password`: User's password (string, min length: 6)

## Parameters for Adding Products
- Endpoint: `/api/v1/user/addProduct`
- Parameters:
  - `name`: A string representing the name of the product.
  - `description`: A string providing a description of the product.
  - `price`: A number indicating the price of the product.
  - `priceType`: An enum specifying whether the price is negotiable or fixed.
    - Enum: ["Negotiable", "Fixed"]
  - `condition`: An enum describing the condition of the product.
    - Enum: ["Brand New", "Used", "Like New"]
    - Required: true
  - `category`: An enum representing the category of the product.
    - Enum: ["Laptops", "Smartphones", "Cameras", "Tablets", "Audio Devices", "Gaming Consoles", "Wearables", "Accessories", "Home Appliances", "Other"]
  - `brand`: An enum indicating the brand of the product.
    - Enum: ["Apple", "Samsung", "Sony", "Dell", "HP", "Lenovo", "LG", "Canon", "Nikon", "Bose", "Microsoft", "Asus", "Logitech", "Google", "Fitbit", "Xiaomi", "Panasonic", "JBL", "Philips"]
  - `picture`: An optional array of strings containing URLs of images representing the product.
  - `location`: A string specifying the location of the product.
  - `seller`: A string identifying the seller of the product.
  - `quantity`: A number indicating the quantity of the product available.
 
## Delete Product Endpoint

- **Endpoint:** `/api/v1/products/:id`
- **Method:** `DELETE`

Deletes a product from the database.

### Request Parameters

- `id`: The unique identifier of the product to be deleted.

### Response

- **Status Code:** 200
  - **Message:** "Product Deleted Successfully"
  - **Deleted Product:** Details of the deleted product.

- **Status Code:** 403
  - **Message:** "You do not have permission to delete this product"

- **Status Code:** 404
  - **Message:** "Product doesn't Exist"

- **Status Code:** 500
  - **Message:** "Internal Server Error"

## Update Product Endpoint

- **Endpoint:** `/api/v1/products/:productId`
- **Method:** `PUT`

Updates an existing product in the database.

### Request Parameters

- `productId`: The unique identifier of the product to be updated.

### Request Body

The request body should contain the fields to be updated in the product. Only fields defined in the product schema will be updated.

### Response

- **Status Code:** 200
  - **Updated Product:** Details of the updated product.

- **Status Code:** 404
  - **Message:** "Product not found or you are not the seller."

- **Status Code:** 400
  - **Message:** Error message indicating the validation errors in the request body.



