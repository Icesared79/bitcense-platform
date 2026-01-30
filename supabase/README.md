# BitCense Connect Database Setup

## Quick Start

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `migrations/001_initial_schema.sql`
4. Paste and run in the SQL Editor

## Tables Created

| Table | Purpose |
|-------|---------|
| `users` | Platform users (admin + client roles) |
| `leads` | Landing page form submissions |
| `assets` | Securities submitted for qualification |
| `documents` | Files uploaded for assets |
| `activity_log` | Status changes and audit trail |

## Storage Setup

After running the migration, set up document storage:

1. Go to **Storage** in Supabase dashboard
2. Create a new bucket called `documents`
3. Set it to **Private**
4. Add storage policies for user access

## Making Yourself Admin

After signing up, run this SQL to make yourself an admin:

```sql
UPDATE public.users
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

## Environment Variables

Make sure these are set in your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```
