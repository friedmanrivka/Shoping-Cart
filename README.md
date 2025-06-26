# Shopping List App

### Project Overview

This project is a full-stack shopping list application designed to help users efficiently manage their grocery shopping. Users can add products to a categorized shopping cart, view category counters, and submit their order, which is then saved to a backend database. The app features a modern, responsive, and RTL-friendly UI, making it suitable for both desktop and mobile devices.

---

### Features

- **Add Products:** Users can add products to their shopping cart, specifying the product name and selecting a category.
- **Category Selection:** Categories are dynamically loaded from the backend and displayed as buttons or dropdowns.
- **Category Counters:** The app displays the total number of items in each category and the overall cart.
- **Increment Quantity:** If a product already exists in the cart, adding it again increases its quantity.
- **Submit Order:** Users can submit their shopping cart, which is then saved to the backend database.
- **Form Validation:** Input fields are validated to ensure correct and complete data entry.
- **Snackbar Feedback:** Users receive real-time feedback for actions such as adding items or submitting orders.
- **Responsive RTL UI:** The interface is fully responsive and supports right-to-left (RTL) languages, using Material-UI.

---

### Technologies Used

#### Frontend

- **React** (with TypeScript)
- **Redux Toolkit** (including RTK Query for API calls)
- **Material-UI (MUI)**
- **Responsive Design** (mobile-friendly)

#### Backend

- **Node.js** (with TypeScript)
- **Express**
- **TypeORM** (Object-Relational Mapping)
- **SQL Server** (database)

---

### API Endpoints

#### `GET /api/categories`

Returns the list of available product categories.

**Response Example:**
```json
[
  { "categoryId": 1, "name": "מוצרי ניקיון" },
  { "categoryId": 2, "name": "גבינות" },
  { "categoryId": 3, "name": "ירקות ופירות" },
  { "categoryId": 4, "name": "בשר ודגים" },
  { "categoryId": 5, "name": "מאפים" }
]
```

---

#### `POST /api/carts`

Submits a new shopping cart (order) to the backend.

**Request Example:**
```json
{
  "userId": "12345",
  "items": [
    { "productName": "Milk", "quantity": 2, "categoryId": 2 },
    { "productName": "Dish Soap", "quantity": 1, "categoryId": 1 }
  ]
}
```

**Response Example:**
```json
{
  "cartId": 101,
  "createdAt": "2024-06-01T12:34:56.789Z",
  "items": [
    { "itemId": 1, "productName": "Milk", "quantity": 2, "categoryId": 2 },
    { "itemId": 2, "productName": "Dish Soap", "quantity": 1, "categoryId": 1 }
  ]
}
```

---

### State Management

- **Redux Toolkit** is used for global state management.
- **Cart Slice:** Manages cart items, category counters, and total item count.
- **RTK Query:** Handles API calls for fetching categories and submitting orders, with built-in caching and loading/error states.

---

### Backend Architecture

- **Express Routes:**
  - `/api/categories` — Returns all categories from the database.
  - `/api/carts` — Accepts and saves new shopping cart orders.
- **Models:**
  - `Category` — Represents a product category.
  - `Cart` — Represents a shopping cart/order.
  - `CartItem` — Represents an item within a cart.
- **Database Structure:**
  - Categories are pre-populated in the database.
  - Orders and their items are saved with references to categories.

---

### UI/UX Details

- **Form Validation:** Ensures users cannot submit empty or invalid product names or categories.
- **Snackbar Feedback:** Provides instant feedback for user actions (e.g., item added, order submitted, errors).
- **Responsive & RTL:** The UI is fully responsive and supports right-to-left languages, ensuring accessibility on all devices.

---

### Setup & Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```

2. **Backend Setup:**
   - Install dependencies:
     ```sh
     cd backend
     npm install
     ```
   - Configure your SQL Server connection in `src/config/database.ts`.
   - Run the backend:
     ```sh
     npm run dev
     ```

3. **Frontend Setup:**
   - Install dependencies:
     ```sh
     cd ../frontend
     npm install
     ```
   - Run the frontend:
     ```sh
     npm start
     ```

4. **Access the app:**  
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Additional Notes

- For cloud deployment, deploy both frontend and backend to your preferred cloud provider and update the API URLs accordingly.
- If you add extra features, document them here and in your commit messages.

---

**For any questions or issues, please refer to the code comments or contact the project maintainer.** 