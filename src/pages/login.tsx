import { CenteredContainer } from "@/components/CenteredContainer/CenteredContainer";
import { makePage, pageLayouts } from "@/lib/makePage";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import { FormEvent, useState } from "react";
import Paper from "@mui/material/Paper";
import { useUser } from "@/lib/auth/useUser";
import { makeGetServerSidePropsRedirect } from "@/lib/auth/redirectSsr";

export default makePage(
  () => {
    const { mutateLogin } = useUser({
      redirectIfFound: true,
      redirectTo: "/",
    });
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const onSubmit = (e: FormEvent) => {
      e.preventDefault();
      mutateLogin.mutate({
        username: email,
      });
    };

    return (
      <CenteredContainer>
        <Paper variant="outlined">
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
    layout: pageLayouts.fullscreen,
    requireAuthentication: false,
  }
);

export const getServerSideProps = makeGetServerSidePropsRedirect("/", true);
