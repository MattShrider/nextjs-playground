import { CenteredContainer } from "@/components/CenteredContainer/CenteredContainer";
import Paper from "@mui/material/Paper";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { getServerSideAuthProps, supabaseClient } from "@/lib/supabase";
import { makePage } from "@/lib/makePage";
import { useUser } from "@/queries/useUser";

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
