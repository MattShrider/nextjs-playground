import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

interface LayoutProps {
  children: React.ReactNode;
  isUnauthenticated?: boolean;
}

export const Layout = ({ isUnauthenticated, children }: LayoutProps) => {
  const maybeToolbar = isUnauthenticated ? null : <Toolbar></Toolbar>;
  return (
    <>
      {maybeToolbar}
      <Container maxWidth="lg">{children}</Container>
    </>
  );
};
