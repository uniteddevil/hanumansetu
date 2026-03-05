import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_FILE = path.join(__dirname, '../src/data/products.js');
const ASSETS_DIR = path.join(__dirname, '../public/assets');

function syncImages() {
    console.log('🔍 Syncing product images...');

    if (!fs.existsSync(PRODUCTS_FILE)) {
        console.error(`❌ Products file not found: ${PRODUCTS_FILE}`);
        return;
    }

    // Read products.js as a string
    let content = fs.readFileSync(PRODUCTS_FILE, 'utf8');

    // Get all files in assets
    const files = fs.readdirSync(ASSETS_DIR);

    // Regular expression to match products array
    const productsRegex = /export const products = (\[[\s\S]*?\]);/;
    const match = content.match(productsRegex);

    if (!match) {
        console.error('❌ Could not find products array in products.js');
        return;
    }

    let products;
    try {
        // Prepare a safe environment for eval
        let js = match[1]
            .replace(/products\.slice\([\s\S]*?\)/g, '[]')
            .replace(/formatPrice\([\s\S]*?\)/g, '""');

        // Use Function instead of eval for slightly better safety/scoping
        products = new Function(`return ${js}`)();
    } catch (e) {
        console.error('❌ Error parsing products array:', e);
        return;
    }

    let changesCount = 0;

    products.forEach(product => {
        const id = product.id;
        // Find all images starting with product-ID
        const mainImagePattern = new RegExp(`^product-${id}\\.(png|jpg|jpeg|webp)$`);
        const altImagePattern = new RegExp(`^product-${id}-alt-(\\d+)\\.(png|jpg|jpeg|webp)$`);

        const mainImageFile = files.find(f => mainImagePattern.test(f));
        const altImageFiles = files
            .filter(f => altImagePattern.test(f))
            .sort((a, b) => {
                const aNum = parseInt(a.match(altImagePattern)[1]);
                const bNum = parseInt(b.match(altImagePattern)[1]);
                return aNum - bNum;
            });

        if (!mainImageFile) return;

        const allImages = [`/assets/${mainImageFile}`, ...altImageFiles.map(f => `/assets/${f}`)];

        // Deep compare
        if (JSON.stringify(product.images) !== JSON.stringify(allImages)) {
            product.images = allImages;
            // Also ensure the primary image matches the first in the array
            product.image = allImages[0];
            changesCount++;
        }
    });

    if (changesCount === 0) {
        console.log('✅ All images are already up to date.');
        return;
    }

    // Format the products array back to JS
    // We try to keep it readable
    const formattedProducts = JSON.stringify(products, null, 4)
        .replace(/"(\w+)":/g, '$1:') // unquote keys
        .replace(/"/g, "'"); // use single quotes

    const newContent = content.replace(productsRegex, `export const products = ${formattedProducts};`);

    fs.writeFileSync(PRODUCTS_FILE, newContent);
    console.log(`✨ Successfully updated ${changesCount} products!`);
}

syncImages();
