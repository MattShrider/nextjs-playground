This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Initial setup required
This application is deployed with vercel integrated with Supabase. That means unless you have a similar setup,
local installation will be difficult.


Session auth requires a `.env.local` file with the following keys
```.env
SECRET_COOKIE_PASSWORD = <your-unique-password-32-chars-long>
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## How to fork the infrastructure
- Fork this repo
- Create a vercel project
- Import the repo with vercel import (I used Github)
- [Create a supabase integration with vercel](https://supabase.com/docs/guides/integrations/vercel)
- Login to vercel with `npm run vercel:login`
- Link your local version with vercel `npm run vercel:link`
- Pull env vars with `npm run vercel:env:pull`
  - This will create a `.env.local` file that SHOULD NEVER be checked into git history

## To Generate types
Supabase can automatically [generate types directly from a prod instance.](https://supabase.com/docs/guides/api/generating-types) This means we don't have to keep updates by hand.

These scripts assume you have a $SUPABASE_PROJECT_ID env var in `.env.local` that points to a supabase project id. It uses [env-cmd](https://github.com/toddbluhm/env-cmd) in order to be windows-compatible.
```bash
npm run supbase:login
npx run supabase:types
```