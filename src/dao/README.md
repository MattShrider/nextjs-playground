dao - Data Access Objects
-----------
These are serer-side objets that retrieve data from outside resources, usually from supabase, but could also be from third-party API.

**In most cases, these should not be called from browser code**, use an API route for that, or a `getServerSideProps` function.