import { supabase } from './supabase.js';
import { clearCart } from './cart.js';

/**
 * Save a new order to Supabase
 * @param {Object} orderData 
 */
export async function createOrder(orderData) {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;

    const { data, error } = await supabase
        .from('orders')
        .insert({
            user_id: userId || null, // Allow guest checkout if needed, but profiles need user_id
            items: orderData.items,
            total_amount: orderData.total_amount,
            status: 'Pending',
            whatsapp_link: orderData.whatsapp_link
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating order:', error);
        throw error;
    }

    // Clear local cart after successful DB save
    clearCart();

    return data;
}

/**
 * Fetch orders for the current user
 */
export async function fetchUserOrders() {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;

    if (!userId) return [];

    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching orders:', error);
        return [];
    }

    return data;
}
