import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cqlrfzqmyzznkxtvjvrm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbHJmenFteXp6bmt4dHZqdnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNDg0MTYsImV4cCI6MjA2MjkyNDQxNn0.Dln4fbDmRIml9ihK4iF4Am7fNJEie5X28sylD1Dq5yI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
