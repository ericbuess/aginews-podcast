import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);

export async function getCronSources() {
  try {
    console.log("Fetching sources...");

    // Hardcoded list of sources
    const sources = [
      { identifier: 'https://news.ycombinator.com/' },
      { identifier: 'https://www.producthunt.com/' },
      { identifier: 'https://www.reuters.com/technology/artificial-intelligence/' },
      { identifier: 'https://simonwillison.net/' },
    ];

    return sources.map(source => source.identifier);
  } catch (error) {
    console.error(error);
  }
} 
  