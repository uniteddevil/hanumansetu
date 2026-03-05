
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verify() {
    console.log('Testing Supabase Connection...');

    // 1. Fetch Products
    const { data: products, error: pError } = await supabase.from('products').select('id, name, slug').limit(10);
    if (pError) {
        console.error('❌ Failed to fetch products:', pError.message);
    } else {
        console.log('✅ Successfully fetched products:', products.length);
        products.forEach(p => console.log(`   - ${p.name} (ID: ${p.id}, Slug: ${p.slug})`));
    }

    // 2. Fetch Orders
    const { data: orders, error: oError } = await supabase.from('orders').select('id, status').limit(5);
    if (oError) {
        console.error('❌ Failed to fetch orders (Note: RLS might block this if not admin):', oError.message);
    } else {
        console.log('✅ Successfully fetched orders:', orders.length);
    }

    // 3. Check for specific products
    const { data: rudraksha } = await supabase.from('products').select('*').eq('slug', 'rudraksha-mala').single();
    if (rudraksha) {
        console.log('✅ Verified specific product: Rudraksha Mala');
    } else {
        console.log('⚠️ Could not find Rudraksha Mala by slug');
    }
}

verify();
