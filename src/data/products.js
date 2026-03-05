import { supabase } from '../utils/supabase.js';

export const STORE_CONFIG = {
    name: 'हनुमान सेतु',
    tagline: 'पवित्र भक्ति सामग्री',
    whatsappNumber: '919598819664',
    upiId: 'your-upi@bank',
    currency: '₹',
    instagram: '',
    email: 'contact@hanumansetu.com',
};

// State-like variable for cached products
let cachedProducts = [];

/**
 * Fetch all products from Supabase
 */
export async function fetchProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    // Map snake_case to camelCase for compatibility with existing components
    cachedProducts = data.map(p => ({
        ...p,
        originalPrice: p.original_price,
        reviewCount: p.review_count,
        stockStatus: p.stock_status,
        features: p.features || []
    }));

    return cachedProducts;
}

/**
 * Get product by slug from Supabase
 */
export async function getProductBySlug(slug) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching product by slug:', error);
        return null;
    }

    return {
        ...data,
        originalPrice: data.original_price,
        reviewCount: data.review_count,
        stockStatus: data.stock_status,
        features: data.features || []
    };
}

export function formatPrice(price) {
    return `${STORE_CONFIG.currency}${price.toLocaleString('en-IN')}`;
}

// Export a getter for the static pages that expect an array (to be updated later)
export const products = cachedProducts;
