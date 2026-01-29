# BitCense Platform

A lead generation landing page with client portal for BitCense, built with Next.js, Supabase, and Tailwind CSS.

## Features

- **Landing Page**: Modern lead capture form with hero, how-it-works, why-us, and team sections
- **Client Portal**: Dashboard to track asset qualification progress, submit assets, upload documents
- **Admin Panel**: Manage leads, review assets, update statuses, provide feedback and scores
- **Authentication**: Magic link authentication via Supabase Auth
- **Email Notifications**: Admin alerts and portal invitations via Resend

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Resend account (for email)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run the schema from `supabase/schema.sql`
3. Enable Email Auth in Authentication > Providers
4. Create a storage bucket named `documents` (private)

### 3. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=admin@yourdomain.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Create Admin User

1. Sign up via the login page with the admin email
2. In Supabase SQL editor, update the user role:

```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@yourdomain.com';
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
bitcense-platform/
├── app/
│   ├── (public)/           # Public routes (landing, login)
│   │   ├── page.tsx        # Landing page
│   │   └── login/
│   ├── (portal)/           # Client portal (auth required)
│   │   ├── dashboard/
│   │   └── assets/
│   ├── admin/              # Admin panel (admin role required)
│   │   ├── page.tsx
│   │   ├── leads/
│   │   ├── assets/
│   │   └── clients/
│   ├── api/
│   │   └── auth/
│   └── layout.tsx
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── landing/            # Landing page sections
│   ├── portal/             # Client portal components
│   └── admin/              # Admin components
├── lib/
│   ├── supabase/           # Supabase clients
│   ├── email/              # Email utilities
│   └── utils.ts
├── types/
│   └── database.ts         # TypeScript types
└── supabase/
    └── schema.sql          # Database schema
```

## User Flows

### Lead Submission
1. Visitor fills out form on landing page
2. Lead created in database
3. Admin notified via email
4. Admin views lead in admin panel

### Portal Invitation
1. Admin clicks "Invite to Portal" on lead
2. User account created in Supabase Auth
3. Magic link email sent to lead
4. Lead status updated to "invited"

### Asset Qualification
1. Client logs into portal
2. Submits asset with details
3. Admin reviews in admin panel
4. Admin updates status, provides feedback/score
5. Client sees updates in their portal

## Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Magic Links)
- **Styling**: Tailwind CSS
- **Email**: Resend
- **Language**: TypeScript

## License

MIT
