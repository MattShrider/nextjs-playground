import { Layout } from "@/components/Layout";
import Typography from "@mui/material/Typography";
import { Link } from "@/components/Link";
import { makePage } from "@/lib/makePage";

export default makePage(function Root() {
  return (
    <Layout>
      <Typography>
        This is a test site that currently contains mock authorization, and a
        responsive AppBar. It is deployed with Vercel.
      </Typography>
      <Typography>
        On the login page, any username and password will pass and &quot;log you
        in&quot; as that email. Note that there is no database or persistant
        storage yet, and no data is saved about the user.
      </Typography>
      <Typography>
        Try visiting the <Link href="/todos">Todos Page</Link> to load
        collections from supabase-js
      </Typography>
    </Layout>
  );
});
