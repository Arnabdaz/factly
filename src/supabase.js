import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "put your supabase url here";
const supabaseKey = "Put your api key here";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
