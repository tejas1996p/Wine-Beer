# Wine & Beer E-Commerce Website Specification

## 1. Project Overview

- **Project Name**: Vintage Spirits - Premium Wine & Beer Store
- **Type**: E-commerce Web Application
- **Core Functionality**: Online store for browsing and purchasing wines, beers, whiskeys, rums, and other spirits with 4000+ products
- **Target Users**: Adults 21+ looking for premium alcoholic beverages

## 2. Tech Stack

### Frontend
- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS with custom vintage theme
- **State Management**: React Context + useState
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js with Express
- **API**: RESTful API

### Database
- **Database**: MySQL 8.0
- **Admin Panel**: phpMyAdmin
- **Containerization**: Docker Compose

## 3. UI/UX Specification

### Color Palette (Vintage-Modern Mix)
- **Primary**: `#722F37` (Wine Burgundy)
- **Secondary**: `#C9A227` (Antique Gold)
- **Background Dark**: `#1A1A1A` (Deep Black)
- **Background Light**: `#F5F0E8` (Aged Paper/Cream)
- **Accent**: `#8B4513` (Saddle Brown)
- **Text Light**: `#FEFEFE`
- **Text Dark**: `#2D2D2D`

### Typography
- **Headings**: Playfair Display (Serif - Vintage feel)
- **Body**: Inter (Sans-serif - Modern readability)
- **Accent**: Cinzel (Elegant decorative)

### Layout Structure
- **Header**: Fixed navigation with logo, search, cart, account
- **Hero**: Full-width featured products carousel
- **Categories**: Grid layout with category cards
- **Products**: Responsive grid (4 cols desktop, 2 tablet, 1 mobile)
- **Footer**: Multi-column with links, newsletter, social

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Visual Effects
- Subtle gold gradients on hover
- Vintage paper texture backgrounds on cards
- Smooth transitions (0.3s ease)
- Product image zoom on hover
- Elegant shadow effects

## 4. Database Schema

### Products Table
```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  brand_name VARCHAR(255) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  subcategory VARCHAR(100),
  abv DECIMAL(4,2),
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(500),
  stock INT DEFAULT 100,
  country VARCHAR(100),
  region VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Categories Table
```sql
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(500)
);
```

## 5. API Endpoints

### Products
- `GET /api/products` - List all products (with pagination, filtering)
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search?q=` - Search products

### Categories
- `GET /api/categories` - List all categories

## 6. Product Categories

1. **Red Wine** - Cabernet Sauvignon, Merlot, Pinot Noir, etc.
2. **White Wine** - Chardonnay, Sauvignon Blanc, Riesling, etc.
3. **Rosé Wine** - Provence Rosé, White Zinfandel
4. **Sparkling Wine** - Champagne, Prosecco, Cava
5. **Beer** - Lager, Ale, Stout, IPA, Wheat Beer
6. **Whiskey** - Bourbon, Scotch, Irish Whiskey, Rye
7. **Rum** - White Rum, Dark Rum, Spiced Rum
8. **Vodka** - Standard, Flavored, Premium
9. **Gin** - London Dry, Botanical, Old Tom
10. **Tequila** - Blanco, Reposado, Añejo
11. **Brandy** - Cognac, Armagnac, Calvados
12. **Sake** - Junmai, Daiginjo, Nigori

## 7. Pages Structure

1. **Home** (`/`) - Hero, Featured Products, Categories Grid, Newsletter
2. **Products** (`/products`) - All products with filters
3. **Category** (`/category/[slug]`) - Products by category
4. **Product Detail** (`/product/[id]`) - Single product view
5. **Search** (`/search`) - Search results

## 8. Components

- Navbar
- Footer
- ProductCard
- CategoryCard
- HeroSection
- FilterSidebar
- SearchBar
- CartDrawer
- ProductGrid

## 9. Acceptance Criteria

- [ ] Docker Compose successfully starts MySQL and phpMyAdmin
- [ ] API returns products from database
- [ ] Homepage displays all categories
- [ ] Products page shows filtering and pagination
- [ ] Product detail page shows all product information
- [ ] Search functionality works
- [ ] Responsive design works on all breakpoints
- [ ] Vintage-modern aesthetic is consistent
- [ ] All product details (Brand, Name, ABV%, Description) displayed
