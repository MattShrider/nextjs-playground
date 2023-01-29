import { CenteredContainer } from "@/components/CenteredContainer/CenteredContainer";
import { makeGetServerSidePropsRedirect } from "@/lib/auth/redirectSsr";
import { useUser } from "@/lib/auth/useUser";
import { makePage } from "@/lib/makePage";
import Button from "@mui/material/Button";

export default makePage(() => {
  const { mutateLogout } = useUser({ redirectTo: "/", redirectIfFound: false });
  const logout = () => mutateLogout.mutate();
  return (
    <CenteredContainer>
      <Button onClick={logout}>Logout</Button>
    </CenteredContainer>
  );
}, {});

export const getServerSideProps = makeGetServerSidePropsRedirect("/", false);
