-- Wine & Beer Database Initialization Script
-- Creates tables and seeds with 4000+ products

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_brand (brand_name)
);

-- Insert categories
INSERT INTO categories (name, slug, description, image_url) VALUES
('Red Wine', 'red-wine', 'Fine red wines from renowned vineyards worldwide', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400'),
('White Wine', 'white-wine', 'Crisp and elegant white wines', 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400'),
('Rosé Wine', 'rose-wine', 'Refreshing rosé wines for every occasion', 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=400'),
('Sparkling Wine', 'sparkling-wine', 'Champagne, Prosecco and sparkling wines', 'https://images.unsplash.com/photo-1594372365401-3b5ff14eaaed?w=400'),
('Beer', 'beer', 'Craft beers, lagers, stouts and ales', 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400'),
('Whiskey', 'whiskey', 'Premium whiskeys from around the world', 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400'),
('Rum', 'rum', 'Fine rums from the Caribbean and beyond', 'https://images.unsplash.com/photo-1614680023167-27d7d4a5bc2a?w=400'),
('Vodka', 'vodka', 'Premium and flavored vodkas', 'https://images.unsplash.com/photo-1613063087250-333946d01332?w=400'),
('Gin', 'gin', 'Craft and premium gins', 'https://images.unsplash.com/photo-1608885898957-a97c01a48fda?w=400'),
('Tequila', 'tequila', 'Premium tequilas from Mexico', 'https://images.unsplash.com/photo-1618453292485-6806f15e0e34?w=400'),
('Brandy', 'brandy', 'Cognac, Armagnac and fine brandies', 'https://images.unsplash.com/photo-1602632214858-93366c0c2c4e?w=400'),
('Sake', 'sake', 'Traditional Japanese sake', 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400');
