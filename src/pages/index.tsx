import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Root() {
  return (
    <>
      <Container maxWidth="xl" sx={{ paddingTop: 2 }}>
        <Typography>
          This is a test site that currently contains mock authorization, and a
          responsive AppBar. It is deployed with Vercel.
        </Typography>
        <Typography>
          On the login page, any username and password will pass and &quot;log
          you in&quot; as that email. Note that there is no database or
          persistant storage yet, and no data is saved about the user.
        </Typography>
      </Container>
    </>
  );
}
