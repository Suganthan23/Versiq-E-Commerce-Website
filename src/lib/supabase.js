import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gouxffsuaamjsemnbfno.supabase.co' 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdXhmZnN1YWFtanNlbW5iZm5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMjE1MDEsImV4cCI6MjA3MTU5NzUwMX0.UVSt9Y7xamLrr0T3GGE0IzTjYnrO2BbFoFH1uK91kAw' 

export const supabase = createClient(supabaseUrl, supabaseAnonKey)