This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
This application is deployed with vercel integrated with Supabase. That means unless you have a similar setup,
local installation will be difficult.

First, install packages
```bash
npm install
```

Session auth requires a `.env.local` file generated from vercel
```bash
# Login to vercel
npm run vercel:login
# Link your local instance to vercel runtime
npm run vercel:link
# Pull env vars to `.env.local`
npm run vercel:env:pull
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Filestructure
Each folder within `src/` should contain a `README.md` explaining what it is for. The exception to this is the `src/pages/` folder, due to each file automatically generating a browser or api route by next-js.


## How to fork the infrastructure
- Fork this repo
- Create a vercel project
- Import the repo with vercel import tool from Github
- [Create a supabase integration with vercel](https://supabase.com/docs/guides/integrations/vercel)
- Login to vercel with `npm run vercel:login`
- Link your local version with vercel `npm run vercel:link`
- Pull env vars with `npm run vercel:env:pull`
  - This will create a `.env.local` file that **SHOULD NEVER** be checked into git history

## To Generate types
Supabase can automatically [generate types directly from a prod instance.](https://supabase.com/docs/guides/api/generating-types) This means we don't have to keep updates by hand.

These scripts assume you have a $SUPABASE_PROJECT_ID env var in `.env.local` that points to a supabase project id. It uses [env-cmd](https://github.com/toddbluhm/env-cmd) in order to be windows-compatible.
```bash
npm run supbase:login
npx run supabase:types
```