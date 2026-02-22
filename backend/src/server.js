const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let pool;

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

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Wine & Beer API is running' });
});

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

app.get('/api/categories', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categories ORDER BY name');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const { page = 1, limit = 20, category, search, minPrice, maxPrice, country, sort = 'id' } = req.query;
        const offset = (page - 1) * limit;
        
        let query = 'SELECT * FROM products WHERE 1=1';
        let countQuery = 'SELECT COUNT(*) as total FROM products WHERE 1=1';
        let params = [];
        let countParams = [];

        if (category) {
            const [catRows] = await pool.query('SELECT name FROM categories WHERE slug = ?', [category]);
            const categoryName = catRows.length > 0 ? catRows[0].name : category;
            query += ' AND category = ?';
            countQuery += ' AND category = ?';
            params.push(categoryName);
            countParams.push(categoryName);
        }

        if (search) {
            query += ' AND (product_name LIKE ? OR brand_name LIKE ? OR description LIKE ?)';
            countQuery += ' AND (product_name LIKE ? OR brand_name LIKE ? OR description LIKE ?)';
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm, searchTerm);
            countParams.push(searchTerm, searchTerm, searchTerm);
        }

        if (minPrice) {
            query += ' AND price >= ?';
            countQuery += ' AND price >= ?';
            params.push(minPrice);
            countParams.push(minPrice);
        }

        if (maxPrice) {
            query += ' AND price <= ?';
            countQuery += ' AND price <= ?';
            params.push(maxPrice);
            countParams.push(maxPrice);
        }

        if (country) {
            query += ' AND country = ?';
            countQuery += ' AND country = ?';
            params.push(country);
            countParams.push(country);
        }

        const validSorts = ['id', 'price', 'product_name', 'brand_name', 'abv'];
        const sortField = validSorts.includes(sort) ? sort : 'id';
        query += ` ORDER BY ${sortField}`;

        if (limit) {
            query += ' LIMIT ?';
            params.push(parseInt(limit));
        }

        if (offset) {
            query += ' OFFSET ?';
            params.push(parseInt(offset));
        }

        const [countResult] = await pool.query(countQuery, countParams);
        const total = countResult[0].total;

        const [rows] = await pool.query(query, params);

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

app.get('/api/products/category/:category', async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;
        
        const categorySlug = req.params.category;
        const [catRows] = await pool.query('SELECT name FROM categories WHERE slug = ?', [categorySlug]);
        const categoryName = catRows.length > 0 ? catRows[0].name : categorySlug;
        
        const [countResult] = await pool.query(
            'SELECT COUNT(*) as total FROM products WHERE category = ?',
            [categoryName]
        );
        const total = countResult[0].total;

        const [rows] = await pool.query(
            'SELECT * FROM products WHERE category = ? ORDER BY product_name LIMIT ? OFFSET ?',
            [categoryName, parseInt(limit), parseInt(offset)]
        );

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

app.get('/api/products/search', async (req, res) => {
    try {
        const { q, page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;
        
        const searchTerm = `%${q}%`;
        
        const [countResult] = await pool.query(
            'SELECT COUNT(*) as total FROM products WHERE product_name LIKE ? OR brand_name LIKE ? OR description LIKE ?',
            [searchTerm, searchTerm, searchTerm]
        );
        const total = countResult[0].total;

        const [rows] = await pool.query(
            'SELECT * FROM products WHERE product_name LIKE ? OR brand_name LIKE ? OR description LIKE ? ORDER BY product_name LIMIT ? OFFSET ?',
            [searchTerm, searchTerm, searchTerm, parseInt(limit), parseInt(offset)]
        );

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

app.get('/api/stats', async (req, res) => {
    try {
        const [categories] = await pool.query(`
            SELECT category, COUNT(*) as count 
            FROM products 
            GROUP BY category 
            ORDER BY count DESC
        `);
        
        const [totalProducts] = await pool.query('SELECT COUNT(*) as total FROM products');
        const [countries] = await pool.query('SELECT DISTINCT country FROM products WHERE country IS NOT NULL');
        
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

async function startServer() {
    await initDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer().catch(console.error);
