import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://gwrpijvfxjppncpmamfp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3cnBpanZmeGpwcG5jcG1hbWZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU1NTMwMCwiZXhwIjoyMDg0MTMxMzAwfQ.oDSFw5xhX67Gt8pxHRwcUQyMTqvzfWiuJDXqoMlpYs0'
);

async function debug() {
  // Get all users from public.users
  const { data: publicUsers, error } = await supabase.from('users').select('*');

  if (error) {
    console.log('Error:', error.message);
    return;
  }

  console.log('Users in public.users table:');
  console.log('----------------------------');
  publicUsers.forEach(u => {
    console.log(`- ${u.email} (role: ${u.role})`);
  });
  console.log(`\nTotal: ${publicUsers.length} users`);
}

debug();
