const mysql = require('mysql2/promise');
require('dotenv').config();

const wineBrands = [
    'Chateau Margaux', 'Opus One', 'Penfolds', 'Cloudy Bay', 'Robert Mondavi',
    'Domaine de la Romanee-Conti', 'Silver Oak', 'Jordan', 'Ridge Vineyards', 'Ferrari-Carano',
    'Kendall-Jackson', 'Fetzer', 'Robert Mondavi', 'Clos du Bois', 'Gallo',
    'Sutter Home', ' Beringer', 'Cakebread', 'Stag\'s Leap Wine Cellars', 'Shafer'
];

const beerBrands = [
    'Heineken', 'Budweiser', 'Coors', 'Miller', 'Corona',
    'Stella Artois', 'Guinness', 'Samuel Adams', 'Sierra Nevada', 'New Belgium',
    'Dogfish Head', 'Bell\'s Brewery', 'Founders', 'Stone Brewing', 'Lagunitas',
    'Brooklyn Brewery', 'Boulevard', 'Great Divide', 'Oskar Blues', 'Victory'
];

const whiskeyBrands = [
    'Jack Daniel\'s', 'Jameson', 'Johnnie Walker', 'Macallan', 'Glenlivet',
    'Bushmills', 'Tullamore DEW', 'Canadian Club', 'Crown Royal', 'Seagram\'s',
    'Bulleit', 'Maker\'s Mark', 'Woodford Reserve', 'Four Roses', 'Old Forester',
    'Knob Creek', 'Buffalo Trace', 'Eagle Rare', 'Wild Turkey', 'Basil Hayden\'s'
];

const rumBrands = [
    'Bacardi', 'Captain Morgan', 'Havana Club', 'Mount Gay', 'Appleton Estate',
    'Don Q', 'Cruzan', 'Pyrat', 'Zaya', 'Santa Teresa',
    'Diplomatico', 'Flor de Cana', 'Angostura', 'Plantation', 'Ron Zacapa'
];

const vodkaBrands = [
    'Smirnoff', 'Grey Goose', 'Absolut', 'Ketel One', 'Skyy',
    'Belvedere', 'Stolichnaya', 'Tito\'s', 'Ketel One', 'Ciroc',
    'Finlandia', 'Polar Ice', 'Khortytsa', 'Svedka', 'Three Olives'
];

const ginBrands = [
    'Gordon\'s', 'Tanqueray', 'Bombay Sapphire', 'Beefeater', 'Hendrick\'s',
    'Aviation', 'Ransom', 'Old Dominick', 'Bluecoat', 'Nolet\'s',
    'Monkey 47', 'Broker\'s', 'Gin Mare', 'The Botanist', 'Sipsmith'
];

const tequilaBrands = [
    'Patron', 'Don Julio', 'Herradura', 'Jose Cuervo', 'Casamigos',
    'Clase Azul', 'Codigo 1530', 'El Jimador', 'Milagro', 'Partida',
    'Casa Noble', 'Hornitos', '1800', 'San Matias', 'Corralejo'
];

const brandyBrands = [
    'Hennessy', 'Remy Martin', 'Courvoisier', 'Martell', 'Camus',
    'Delamain', 'Frapin', 'Otard', 'Meukow', 'Bardinet',
    'Osocalis', 'St-Vincent', 'Deau', 'A. de Fougerat', 'Prince de Montluc'
];

const sakeBrands = [
    'Gekkeikan', 'Ozeki', 'Moonstone', 'TY KU', 'Matsui',
    'Kikumasamune', 'Hakutsuru', 'Dassai', 'Kokuryu', 'Kikusui',
    'Sawanoi', 'Tamagawa', 'Koshinokuni', 'Yuki no Mai', 'Watanabe'
];

const wineCountries = ['France', 'Italy', 'Spain', 'USA', 'Australia', 'Argentina', 'Chile', 'Germany', 'Portugal', 'New Zealand'];
const beerCountries = ['USA', 'Germany', 'Belgium', 'Netherlands', 'UK', 'Ireland', 'Mexico', 'Czech Republic', 'Japan', 'Canada'];
const spiritsCountries = ['USA', 'UK', 'France', 'Mexico', 'Japan', 'Canada', 'Ireland', 'Scotland', 'Cuba', 'Jamaica'];

const wineRegions = {
    'France': ['Bordeaux', 'Burgundy', 'Champagne', 'Loire Valley', 'Rhone Valley', 'Alsace'],
    'Italy': ['Tuscany', 'Piedmont', 'Veneto', 'Chianti', 'Barolo', 'Barbaresco'],
    'Spain': ['Rioja', 'Ribera del Duero', 'Priorat', 'Jerez', 'Rias Baixas'],
    'USA': ['Napa Valley', 'Sonoma', 'Willamette Valley', 'Columbia Valley', 'Paso Robles'],
    'Australia': ['Barossa Valley', 'Margaret River', 'Hunter Valley', 'Yarra Valley', 'McLaren Vale'],
    'Argentina': ['Mendoza', 'Salta', 'San Juan', 'Uco Valley'],
    'Chile': ['Maipo Valley', 'Colchagua', 'Casablanca', 'Limari Valley'],
    'Germany': ['Mosel', 'Rheingau', 'Pfalz', 'Baden', 'Wurttemberg'],
    'Portugal': ['Douro', 'Alentejo', 'Bairrada', 'Dão'],
    'New Zealand': ['Marlborough', 'Hawke\'s Bay', 'Central Otago', 'Martinborough']
};

const redWineTypes = ['Cabernet Sauvignon', 'Merlot', 'Pinot Noir', 'Syrah/Shiraz', 'Malbec', 'Zinfandel', 'Sangiovese', 'Nebbiolo', 'Tempranillo', 'Grenache'];
const whiteWineTypes = ['Chardonnay', 'Sauvignon Blanc', 'Riesling', 'Pinot Grigio', 'Gewürztraminer', 'Viognier', 'Chenin Blanc', 'Grüner Veltliner', 'Moscato', 'Sémillon'];
const roseTypes = ['Provence Rosé', 'White Zinfandel', 'Rosé of Pinot Noir', 'White Merlot', 'Sangiovese Rosé'];
const sparklingTypes = ['Champagne', 'Prosecco', 'Cava', 'Crémant', 'Moscato d\'Asti', 'Sparkling Rosé'];
const beerTypes = ['Lager', 'Pilsner', 'Ale', 'IPA', 'Stout', 'Porter', 'Wheat Beer', 'Pale Ale', 'Amber Ale', 'Brown Ale', 'Saison', 'Tripel', 'Dubbel', 'Sour Ale', 'Barleywine'];
const whiskeyTypes = ['Bourbon', 'Scotch', 'Irish Whiskey', 'Rye Whiskey', 'Canadian Whisky', 'Tennessee Whiskey', 'Single Malt', 'Blended Whiskey'];
const rumTypes = ['White Rum', 'Gold Rum', 'Dark Rum', 'Spiced Rum', 'Aged Rum', 'Flavored Rum'];
const vodkaTypes = ['Plain Vodka', 'Flavored Vodka', 'Premium Vodka', 'Ultra Premium', 'Russian Vodka', 'Polish Vodka'];
const ginTypes = ['London Dry', 'New Western Dry', 'Old Tom', 'Navy Strength', 'Flavored Gin', 'Compound Gin'];
const tequilaTypes = ['Blanco', 'Reposado', 'Añejo', 'Extra Añejo', 'Mezcal', 'Flavored Tequila'];
const brandyTypes = ['Cognac', 'Armagnac', 'Calvados', 'Pisco', 'Grappa', 'Brandy de Jerez'];
const sakeTypes = ['Junmai', 'Daiginjo', 'Ginjo', 'Nigori', 'Honjozo', 'Futsuu', 'Koshu'];

const wineDescriptions = [
    'A full-bodied wine with rich layers of dark fruit, subtle oak, and elegant tannins. Perfect for special occasions.',
    'Crisp and refreshing with bright citrus notes and a clean finish. An excellent choice for casual dining.',
    'Complex and sophisticated with notes of ripe berries, vanilla, and a hint of spice. Aged to perfection.',
    'A well-balanced wine featuring delicate floral aromas, smooth texture, and a lingering finish.',
    'Bold and intense with dark cherry flavors, earthy undertones, and firm tannins. Ideal for red meat dishes.',
    'Elegant and refined with layers of orchard fruit, honey, and subtle oak. A true classic.',
    'Vibrant and youthful with fresh fruit characters and zesty acidity. Perfect for summer sipping.',
    'Luxurious and velvety with dark chocolate, espresso, and ripe plums. A wine collector\'s delight.',
    'Delicate and aromatic with rose petals, red berries, and a touch of minerality.',
    'Rich and opulent with cassis, cedar, and tobacco. A benchmark expression of its terroir.'
];

const beerDescriptions = [
    'Crisp and refreshing with a clean, golden color and balanced hop bitterness. Perfect for any occasion.',
    'Full-bodied and smooth with rich malt flavors and subtle fruit notes. A timeless classic.',
    'Hoppy and aromatic with citrus and pine notes. A favorite among craft beer enthusiasts.',
    'Dark and mysterious with roasted coffee, chocolate, and a creamy head. Deeply satisfying.',
    'Light and effervescent with a subtle wheat character and hint of spice. Incredibly drinkable.',
    'Bold and complex with layers of caramel, toffee, and toasted bread. Warming and rewarding.',
    'Bright and tangy with a perfect balance of sour and sweet. Refreshing and unique.',
    'Rich and malty with hints of brown sugar and dried fruit. A cozy companion for cold evenings.',
    'Crisp and clean with a delicate hop profile and smooth finish. Traditional brewing at its best.',
    'Juicy and tropical with ripe mango, pineapple, and citrus aromas. A modern IPA masterpiece.'
];

const spiritDescriptions = [
    'Smooth and mellow with rich complexity and a long, satisfying finish. A premium spirit for discerning palates.',
    'Exceptionally crafted with carefully selected ingredients and traditional methods passed down through generations.',
    'Bold and distinctive with layers of flavor that unfold with each sip. Perfect for cocktails or neat.',
    'Refined and elegant with subtle notes of oak, vanilla, and spice. A sophisticated choice.',
    'Clean and crisp with a smooth texture and clean finish. Versatile and always enjoyable.',
    'A rich and satisfying spirit with deep amber color and complex aroma. Ideal for special moments.',
    'Premium quality with exceptional smoothness and a balanced flavor profile. Sets the standard.',
    'Artfully produced using time-honored techniques and the finest ingredients available.',
    'Distinctive and memorable with unique character and exceptional quality. A true classic.',
    'Luxurious and refined with sophisticated flavors that linger beautifully on the palate.'
];

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomPrice(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

function randomABV(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
}

async function seedProducts() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'rootpassword',
        database: process.env.DB_NAME || 'wine_beer_db'
    });

    console.log('Connected to database');

    let products = [];
    let productId = 1;

    // Generate Red Wines (500 products)
    console.log('Generating Red Wines...');
    for (let i = 0; i < 500; i++) {
        const brand = randomItem(wineBrands);
        const type = randomItem(redWineTypes);
        const country = randomItem(wineCountries);
        const region = wineRegions[country] ? randomItem(wineRegions[country]) : country;
        
        products.push([
            brand,
            `${type} ${brand} ${region} ${2020 + Math.floor(Math.random() * 5)}`,
            'Red Wine',
            type,
            parseFloat(randomABV(12, 16)),
            randomItem(wineDescriptions),
            parseFloat(randomPrice(9.99, 299.99)),
            `https://placehold.co/400x600/722F37/FEFEFE?text=${encodeURIComponent(type)}`,
            Math.floor(Math.random() * 200) + 20,
            country,
            region
        ]);
    }

    // Generate White Wines (500 products)
    console.log('Generating White Wines...');
    for (let i = 0; i < 500; i++) {
        const brand = randomItem(wineBrands);
        const type = randomItem(whiteWineTypes);
        const country = randomItem(wineCountries);
        const region = wineRegions[country] ? randomItem(wineRegions[country]) : country;
        
        products.push([
            brand,
            `${type} ${brand} ${region} ${2020 + Math.floor(Math.random() * 5)}`,
            'White Wine',
            type,
            parseFloat(randomABV(11, 14)),
            randomItem(wineDescriptions),
            parseFloat(randomPrice(9.99, 199.99)),
            `https://placehold.co/400x600/C9A227/1A1A1A?text=${encodeURIComponent(type)}`,
            Math.floor(Math.random() * 200) + 20,
            country,
            region
        ]);
    }

    // Generate Rosé Wines (300 products)
    console.log('Generating Rosé Wines...');
    for (let i = 0; i < 300; i++) {
        const brand = randomItem(wineBrands);
        const type = randomItem(roseTypes);
        
        products.push([
            brand,
            `${brand} ${type}`,
            'Rosé Wine',
            type,
            parseFloat(randomABV(10, 13)),
            randomItem(wineDescriptions),
            parseFloat(randomPrice(8.99, 79.99)),
            `https://placehold.co/400x600/FFB6C1/1A1A1A?text=Ros%C3%A9`,
            Math.floor(Math.random() * 200) + 20,
            randomItem(wineCountries),
            null
        ]);
    }

    // Generate Sparkling Wines (300 products)
    console.log('Generating Sparkling Wines...');
    for (let i = 0; i < 300; i++) {
        const brand = randomItem(wineBrands);
        const type = randomItem(sparklingTypes);
        
        products.push([
            brand,
            `${brand} ${type}`,
            'Sparkling Wine',
            type,
            parseFloat(randomABV(10, 15)),
            randomItem(wineDescriptions),
            parseFloat(randomPrice(14.99, 399.99)),
            `https://placehold.co/400x600/F5F0E8/722F37?text=${encodeURIComponent(type)}`,
            Math.floor(Math.random() * 150) + 10,
            randomItem(['France', 'Italy', 'Spain', 'USA']),
            type === 'Champagne' ? 'Champagne' : null
        ]);
    }

    // Generate Beer (800 products)
    console.log('Generating Beer...');
    for (let i = 0; i < 800; i++) {
        const brand = randomItem(beerBrands);
        const type = randomItem(beerTypes);
        const country = randomItem(beerCountries);
        
        products.push([
            brand,
            `${brand} ${type}`,
            'Beer',
            type,
            parseFloat(randomABV(3, 12)),
            randomItem(beerDescriptions),
            parseFloat(randomPrice(1.99, 29.99)),
            `https://placehold.co/400x600/8B4513/FEFEFE?text=${encodeURIComponent(type)}`,
            Math.floor(Math.random() * 500) + 50,
            country,
            null
        ]);
    }

    // Generate Whiskey (600 products)
    console.log('Generating Whiskey...');
    for (let i = 0; i < 600; i++) {
        const brand = randomItem(whiskeyBrands);
        const type = randomItem(whiskeyTypes);
        const country = type === 'Scotch' ? 'Scotland' : type === 'Irish Whiskey' ? 'Ireland' : 'USA';
        
        products.push([
            brand,
            `${brand} ${type}`,
            'Whiskey',
            type,
            parseFloat(randomABV(40, 60)),
            randomItem(spiritDescriptions),
            parseFloat(randomPrice(19.99, 499.99)),
            `https://placehold.co/400x600/C9A227/1A1A1A?text=${encodeURIComponent(type)}`,
            Math.floor(Math.random() * 100) + 10,
            country,
            null
        ]);
    }

    // Generate Rum (400 products)
    console.log('Generating Rum...');
    for (let i = 0; i < 400; i++) {
        const brand = randomItem(rumBrands);
        const type = randomItem(rumTypes);
        
        products.push([
            brand,
            `${brand} ${type}`,
            'Rum',
            type,
            parseFloat(randomABV(35, 50)),
            randomItem(spiritDescriptions),
            parseFloat(randomPrice(14.99, 199.99)),
            `https://placehold.co/400x600/8B4513/FEFEFE?text=${encodeURIComponent(type)}`,
            Math.floor(Math.random() * 150) + 20,
            randomItem(spiritsCountries),
            null
        ]);
    }

    // Generate Vodka (300 products)
    console.log('Generating Vodka...');
    for (let i = 0; i < 300; i++) {
        const brand = randomItem(vodkaBrands);
        const type = randomItem(vodkaTypes);
        
        products.push([
            brand,
            `${brand} ${type}`,
            'Vodka',
            type,
            parseFloat(randomABV(35, 50)),
            randomItem(spiritDescriptions),
            parseFloat(randomPrice(9.99, 149.99)),
            `https://placehold.co/400x600/F5F0E8/1A1A1A?text=${encodeURIComponent(type)}`,
            Math.floor(Math.random() * 200) + 30,
            randomItem(['USA', 'Russia', 'Poland', 'France', 'Sweden', 'Netherlands']),
            null
        ]);
    }

    // Generate Gin (250 products)
    console.log('Generating Gin...');
    for (let i = 0; i < 250; i++) {
        const brand = randomItem(ginBrands);
        const type = randomItem(ginTypes);
        
        products.push([
            brand,
            `${brand} ${type} Gin`,
            'Gin',
            type,
            parseFloat(randomABV(40, 57)),
            randomItem(spiritDescriptions),
            parseFloat(randomPrice(14.99, 179.99)),
            `https://placehold.co/400x600/2E8B57/FEFEFE?text=Gin`,
            Math.floor(Math.random() * 150) + 20,
            randomItem(['UK', 'USA', 'Netherlands', 'Germany', 'Spain']),
            null
        ]);
    }

    // Generate Tequila (250 products)
    console.log('Generating Tequila...');
    for (let i = 0; i < 250; i++) {
        const brand = randomItem(tequilaBrands);
        const type = randomItem(tequilaTypes);
        
        products.push([
            brand,
            `${brand} ${type}`,
            'Tequila',
            type,
            parseFloat(randomABV(35, 55)),
            randomItem(spiritDescriptions),
            parseFloat(randomPrice(19.99, 299.99)),
            `https://placehold.co/400x600/C9A227/1A1A1A?text=${encodeURIComponent(type)}`,
            Math.floor(Math.random() * 100) + 15,
            'Mexico',
            type === 'Mezcal' ? 'Oaxaca' : 'Jalisco'
        ]);
    }

    // Generate Brandy (200 products)
    console.log('Generating Brandy...');
    for (let i = 0; i < 200; i++) {
        const brand = randomItem(brandyBrands);
        const type = randomItem(brandyTypes);
        
        products.push([
            brand,
            `${brand} ${type}`,
            'Brandy',
            type,
            parseFloat(randomABV(36, 50)),
            randomItem(spiritDescriptions),
            parseFloat(randomPrice(24.99, 399.99)),
            `https://placehold.co/400x600/8B4513/FEFEFE?text=${encodeURIComponent(type)}`,
            Math.floor(Math.random() * 80) + 10,
            type === 'Cognac' || type === 'Armagnac' ? 'France' : randomItem(['USA', 'Spain', 'Peru']),
            type === 'Cognac' ? 'Cognac' : null
        ]);
    }

    // Generate Sake (150 products)
    console.log('Generating Sake...');
    for (let i = 0; i < 150; i++) {
        const brand = randomItem(sakeBrands);
        const type = randomItem(sakeTypes);
        
        products.push([
            brand,
            `${brand} ${type}`,
            'Sake',
            type,
            parseFloat(randomABV(12, 20)),
            'A traditional Japanese sake with delicate flavors of rice, subtle fruit notes, and a smooth, clean finish. Best served chilled or at room temperature.',
            parseFloat(randomPrice(9.99, 149.99)),
            `https://placehold.co/400x600/F5F0E8/722F37?text=Sake`,
            Math.floor(Math.random() * 100) + 20,
            'Japan',
            randomItem(['Hyogo', 'Niigata', 'Kyoto', 'Fukuoka', 'Aichi'])
        ]);
    }

    console.log(`Total products to insert: ${products.length}`);

    // Insert products in batches
    const batchSize = 100;
    for (let i = 0; i < products.length; i += batchSize) {
        const batch = products.slice(i, i + batchSize);
        const placeholders = batch.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ');
        const values = batch.flat();
        
        await connection.query(
            `INSERT INTO products (brand_name, product_name, category, subcategory, abv, description, price, image_url, stock, country, region) VALUES ${placeholders}`,
            values
        );
        
        console.log(`Inserted ${Math.min(i + batchSize, products.length)} / ${products.length} products`);
    }

    console.log('Database seeded successfully!');
    
    // Verify counts
    const [countResult] = await connection.query('SELECT category, COUNT(*) as count FROM products GROUP BY category');
    console.log('\nProducts by category:');
    countResult.forEach(row => {
        console.log(`  ${row.category}: ${row.count}`);
    });

    const [totalResult] = await connection.query('SELECT COUNT(*) as total FROM products');
    console.log(`\nTotal products: ${totalResult[0].total}`);

    await connection.end();
}

seedProducts().catch(console.error);
