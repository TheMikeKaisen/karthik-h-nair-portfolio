import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-31',
});

async function check() {
  const data = await client.fetch(`*[!( _id in path("drafts.**") ) && (_type == "article" || _type == "devLog") && _createdAt match "2026-04-04*"] { _type, _id, _createdAt, title }`);
  console.log(JSON.stringify(data, null, 2));
}

check();
