# Vintage Spirits - Wine & Beer E-Commerce Website

A premium e-commerce platform for wines, beers, and spirits with over 4,000 products.

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **State Management**: React Context

### Backend
- **Runtime**: Node.js with Express
- **API**: RESTful API

### Database
- **Database**: MySQL 8.0
- **Admin Panel**: phpMyAdmin
- **Containerization**: Docker Compose

## Getting Started

### Prerequisites
- Node.js 18+
- Docker Desktop
- npm or yarn

### Step 1: Start Database with Docker

```bash
# Start MySQL and phpMyAdmin
docker-compose up -d

# Wait for MySQL to be ready (about 10-15 seconds)
# Then run the seed script to populate 4000+ products
cd backend
npm install
npm run seed
```

### Step 2: Start the Backend API

```bash
cd backend
npm install
npm start
```

The API will run on http://localhost:5000

### Step 3: Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The website will be available at http://localhost:3000

## phpMyAdmin Access

- URL: http://localhost:8080
- Username: root
- Password: rootpassword

## API Endpoints

- `GET /api/categories` - List all categories
- `GET /api/products` - List products (with pagination & filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search?q=` - Search products

## Product Categories

1. Red Wine
2. White Wine
3. Rosé Wine
4. Sparkling Wine
5. Beer
6. Whiskey
7. Rum
8. Vodka
9. Gin
10. Tequila
11. Brandy
12. Sake

## Each Product Contains

- Brand Name
- Product Name
- ABV%
- Description
- Price
- Stock
- Country
- Region (where applicable)
