
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkSchema() {
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    if (error) {
        console.error('Error fetching profile:', error);
    } else if (data.length === 0) {
        console.log('Profiles table is empty.');
        // Check columns using a select for an non-existent column to see the error, or just try id
        const { data: d2, error: e2 } = await supabase.from('profiles').select('*');
        console.log('Columns (empty table):', d2 ? Object.keys(d2[0] || {}) : 'No data');
    } else {
        console.log('Columns in profiles:', Object.keys(data[0] || {}));
    }
}
checkSchema();
