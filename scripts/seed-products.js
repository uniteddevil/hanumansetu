import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const PRODUCTS_FILE = path.join(__dirname, '../src/data/products.js');

async function seedProducts() {
    console.log('🌱 Seeding products to Supabase...');

    // Read the code to extract products array
    const content = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    const productsRegex = /export const products = (\[[\s\S]*?\]);/;
    const match = content.match(productsRegex);

    if (!match) {
        console.error('Could not find products array');
        return;
    }

    // Use Function to safely evaluate the JS array
    const products = new Function(`return ${match[1]}`)();

    for (const product of products) {
        console.log(`📦 Seeding: ${product.name}...`);

        // Map JS camelCase to SQL snake_case
        const productData = {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            original_price: product.originalPrice,
            description: product.description,
            category: product.category,
            image: product.image,
            images: product.images,
            features: product.features,
            tag: product.tag,
            rating: product.rating,
            review_count: product.reviewCount,
            updated_at: new Date()
        };

        const { error } = await supabase
            .from('products')
            .upsert(productData);

        if (error) {
            console.error(`❌ Error seeding ${product.name}:`, error.message);
        } else {
            console.log(`✅ Success: ${product.name}`);
        }
    }

    console.log('✨ Seeding complete!');
}

seedProducts();
