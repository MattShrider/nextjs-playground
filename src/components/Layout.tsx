import Container from "@mui/material/Container";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container maxWidth="xl" sx={{ paddingTop: 2 }}>
      {children}
    </Container>
  );
};
