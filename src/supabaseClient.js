import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://rczftrbhjwpprgrbckfp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjemZ0cmJoandwcHJncmJja2ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTc4MjksImV4cCI6MjAzMjkzMzgyOX0.4e-Na1uiyUWdYdpDNFe3HiV1smYfXGhleOx5Hk1EUzU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase;
