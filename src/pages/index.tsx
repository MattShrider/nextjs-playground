import { Layout } from "@/components/Layout";
import Typography from "@mui/material/Typography";
import { Link } from "@/components/Link";
import { makePage } from "@/lib/makePage";

export default makePage(function Root() {
  return (
    <Layout>
      <Typography>
        This is a test site to play around with next-js, and of course it is a
        good ol' todo app. The application authorizes and stores data with
        supabase-js.
      </Typography>
      <Typography sx={{ marginTop: 2 }}>
        Try visiting the <Link href="/todos">Todos Page</Link> to load
        collections from supabase-js
      </Typography>
    </Layout>
  );
});
