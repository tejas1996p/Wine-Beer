/* ============================================
   EXPRESS - Web framework for Node.js
   ============================================ */
const express = require('express');

/* ============================================
   CORS - Cross-Origin Resource Sharing
   ============================================ */
const cors = require('cors');

/* ============================================
   MYSQL2 - MySQL database driver with promise support
   ============================================ */
const mysql = require('mysql2/promise');

/* ============================================
   DOTENV - Environment variables
   ============================================ */
require('dotenv').config();

/* ============================================
   EXPRESS APP INITIALIZATION
   ============================================ */
const app = express();
const PORT = process.env.PORT || 5000;

/* ============================================
   MIDDLEWARE - Request processing
   ============================================ */
// Enable CORS for cross-origin requests
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

/* ============================================
   DATABASE CONNECTION - MySQL connection pool
   ============================================ */
let pool;

/* Initialize database connection pool */
async function initDB() {
    pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'rootpassword',
        database: process.env.DB_NAME || 'wine_beer_db',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    console.log('Database connection pool created');
}

/* ============================================
   HEALTH CHECK ENDPOINT - Verify server is running
   ============================================ */
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Wine & Beer API is running' });
});

/* ============================================
   ROOT ENDPOINT - API information
   ============================================ */
app.get('/', (req, res) => {
    res.json({ 
        message: 'Wine & Beer API', 
        endpoints: [
            '/api/health',
            '/api/categories',
            '/api/products',
            '/api/products/:id',
            '/api/stats'
        ]
    });
});

/* ============================================
   GET ALL CATEGORIES - Retrieve product categories
   ============================================ */
app.get('/api/categories', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categories ORDER BY name');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

/* ============================================
   GET ALL PRODUCTS - Retrieve products with filters
   ============================================ */
app.get('/api/products', async (req, res) => {
    try {
        /* Extract query parameters */
        const { page = 1, limit = 20, category, search, minPrice, maxPrice, country, sort = 'id' } = req.query;
        const offset = (page - 1) * limit;
        
        /* Build base query */
        let query = 'SELECT * FROM products WHERE 1=1';
        let countQuery = 'SELECT COUNT(*) as total FROM products WHERE 1=1';
        let params = [];
        let countParams = [];

        /* Filter by category */
        if (category) {
            const [catRows] = await pool.query('SELECT name FROM categories WHERE slug = ?', [category]);
            const categoryName = catRows.length > 0 ? catRows[0].name : category;
            query += ' AND category = ?';
            countQuery += ' AND category = ?';
            params.push(categoryName);
            countParams.push(categoryName);
        }

        /* Filter by search term - searches name, brand, and description */
        if (search) {
            query += ' AND (product_name LIKE ? OR brand_name LIKE ? OR description LIKE ?)';
            countQuery += ' AND (product_name LIKE ? OR brand_name LIKE ? OR description LIKE ?)';
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm, searchTerm);
            countParams.push(searchTerm, searchTerm, searchTerm);
        }

        /* Filter by minimum price */
        if (minPrice) {
            query += ' AND price >= ?';
            countQuery += ' AND price >= ?';
            params.push(minPrice);
            countParams.push(minPrice);
        }

        /* Filter by maximum price */
        if (maxPrice) {
            query += ' AND price <= ?';
            countQuery += ' AND price <= ?';
            params.push(maxPrice);
            countParams.push(maxPrice);
        }

        /* Filter by country */
        if (country) {
            query += ' AND country = ?';
            countQuery += ' AND country = ?';
            params.push(country);
            countParams.push(country);
        }

        /* Add sorting - validate sort field to prevent SQL injection */
        const validSorts = ['id', 'price', 'product_name', 'brand_name', 'abv'];
        const sortField = validSorts.includes(sort) ? sort : 'id';
        query += ` ORDER BY ${sortField}`;

        /* Add pagination limits */
        if (limit) {
            query += ' LIMIT ?';
            params.push(parseInt(limit));
        }

        if (offset) {
            query += ' OFFSET ?';
            params.push(parseInt(offset));
        }

        /* Get total count for pagination */
        const [countResult] = await pool.query(countQuery, countParams);
        const total = countResult[0].total;

        /* Execute main query */
        const [rows] = await pool.query(query, params);

        /* Return products with pagination info */
        res.json({
            products: rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

/* ============================================
   GET PRODUCT BY ID - Retrieve single product
   ============================================ */
app.get('/api/products/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

/* ============================================
   GET PRODUCTS BY CATEGORY - Filter by category
   ============================================ */
app.get('/api/products/category/:category', async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;
        
        /* Get category name from slug */
        const categorySlug = req.params.category;
        const [catRows] = await pool.query('SELECT name FROM categories WHERE slug = ?', [categorySlug]);
        const categoryName = catRows.length > 0 ? catRows[0].name : categorySlug;
        
        /* Get total count for category */
        const [countResult] = await pool.query(
            'SELECT COUNT(*) as total FROM products WHERE category = ?',
            [categoryName]
        );
        const total = countResult[0].total;

        /* Fetch products in category */
        const [rows] = await pool.query(
            'SELECT * FROM products WHERE category = ? ORDER BY product_name LIMIT ? OFFSET ?',
            [categoryName, parseInt(limit), parseInt(offset)]
        );

        /* Return with pagination */
        res.json({
            products: rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

/* ============================================
   SEARCH PRODUCTS - Full-text search
   ============================================ */
app.get('/api/products/search', async (req, res) => {
    try {
        const { q, page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;
        
        const searchTerm = `%${q}%`;
        
        /* Get total search results */
        const [countResult] = await pool.query(
            'SELECT COUNT(*) as total FROM products WHERE product_name LIKE ? OR brand_name LIKE ? OR description LIKE ?',
            [searchTerm, searchTerm, searchTerm]
        );
        const total = countResult[0].total;

        /* Execute search query */
        const [rows] = await pool.query(
            'SELECT * FROM products WHERE product_name LIKE ? OR brand_name LIKE ? OR description LIKE ? ORDER BY product_name LIMIT ? OFFSET ?',
            [searchTerm, searchTerm, searchTerm, parseInt(limit), parseInt(offset)]
        );

        /* Return results with pagination */
        res.json({
            products: rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ error: 'Failed to search products' });
    }
});

/* ============================================
   GET FEATURED WINES - Random featured wine selection
   ============================================ */
app.get('/api/featured', async (req, res) => {
    try {
        const { limit = 20 } = req.query;
        
        /* Get random wines from wine categories */
        const [rows] = await pool.query(
            `SELECT * FROM products 
             WHERE category IN ('Red Wine', 'White Wine', 'Rosé Wine', 'Sparkling Wine')
             ORDER BY RAND() 
             LIMIT ?`,
            [parseInt(limit)]
        );

        res.json({
            products: rows,
            total: rows.length
        });
    } catch (error) {
        console.error('Error fetching featured wines:', error);
        res.status(500).json({ error: 'Failed to fetch featured wines' });
    }
});

/* ============================================
   GET STATISTICS - Store analytics data
   ============================================ */
app.get('/api/stats', async (req, res) => {
    try {
        /* Get product count by category */
        const [categories] = await pool.query(`
            SELECT category, COUNT(*) as count 
            FROM products 
            GROUP BY category 
            ORDER BY count DESC
        ]);
        
        /* Get total product count */
        const [totalProducts] = await pool.query('SELECT COUNT(*) as total FROM products');
        
        /* Get unique countries */
        const [countries] = await pool.query('SELECT DISTINCT country FROM products WHERE country IS NOT NULL');
        
        /* Return statistics */
        res.json({
            totalProducts: totalProducts[0].total,
            byCategory: categories,
            countries: countries.map(c => c.country)
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

/* ============================================
   SERVER STARTUP - Initialize and start listening
   ============================================ */
async function startServer() {
    await initDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

/* Start the server with error handling */
startServer().catch(console.error);
