import { CenteredContainer } from "@/components/CenteredContainer/CenteredContainer";
import Paper from "@mui/material/Paper";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { getServerSideAuthProps, supabaseClient } from "@/lib/supabase";
import { makePage } from "@/lib/makePage";
import { useUser } from "@/queries/useUser";
import Alert from "@mui/material/Alert";

export default makePage(
  () => {
    useUser({ redirectWhenAuthenticated: "/" });
    return (
      <CenteredContainer>
        <Paper
          variant="outlined"
          sx={{
            padding: 3,
            maxWidth: "md",
          }}
        >
          <Alert color="warning">
            Login is currently broken. Your username and password <b>WILL</b> be
            stored but your session will not authenticate.
          </Alert>
          <Auth
            supabaseClient={supabaseClient}
            appearance={{ theme: ThemeSupa }}
          />
        </Paper>
      </CenteredContainer>
    );
  },
  { hideAppBar: true }
);

export const getServerSideProps = getServerSideAuthProps({
  redirectWhenAuthenticated: "/todos",
  redirectWhenNoSession: null,
});
