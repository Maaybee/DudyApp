// URL e chave do Supabase
const SUPABASE_URL = "https://jqteyocpfokvjmsrdiea.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxdGV5b2NwZm9rdmptc3JkaWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MTQwNDIsImV4cCI6MjA3MTE5MDA0Mn0.SNBHJgmoXVIAx6d5uDIBU2OYfzIzyZMbqcigAuoSBtA";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('Supabase Client Initialized:', supabaseClient);
