import { CenteredContainer } from "@/components/CenteredContainer/CenteredContainer";
import { makePage } from "@/lib/makePage";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import { useUser } from "@/lib/auth/useUser";
import { makeGetServerSidePropsRedirect } from "@/lib/auth/redirectSsr";
import Typography from "@mui/material/Typography";

export default makePage(
  function LoginPage() {
    const { mutateLogin } = useUser({
      redirectIfFound: true,
      redirectTo: "/",
    });
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const onSubmit = () => {
      mutateLogin.mutate({
        username: email,
      });
    };

    return (
      <CenteredContainer>
        <Paper
          variant="outlined"
          sx={{
            padding: 3,
            maxWidth: "md",
          }}
        >
          <Typography variant="h5" component="h1" mb={2}>
            Please log into the application to continue.
          </Typography>
          <LoginForm
            onSubmit={onSubmit}
            email={email}
            pass={pass}
            onEmail={setEmail}
            onPass={setPass}
          />
        </Paper>
      </CenteredContainer>
    );
  },
  {
    hideAppBar: true,
  }
);

export const getServerSideProps = makeGetServerSidePropsRedirect("/", true);
