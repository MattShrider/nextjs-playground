import { CenteredContainer } from "@/components/CenteredContainer/CenteredContainer";
import { useSignOut } from "@/queries/useUser";
import { ReactNode, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { makePage } from "@/lib/makePage";

export default makePage(
  () => {
    const mutator = useSignOut();

    useEffect(() => {
      mutator.mutate();
    }, []);

    const content: ReactNode = mutator.isError ? (
      <Box sx={{ textAlign: "center" }}>
        <ErrorOutline color="error" sx={{ fontSize: "5rem" }} />
        <Typography variant="h6">
          Something went wrong when logging out.
        </Typography>
        <Typography>
          Please clear your temporary browser files and try again.
        </Typography>
      </Box>
    ) : (
      <Typography variant="h3">Logging out</Typography>
    );

    return <CenteredContainer>{content}</CenteredContainer>;
  },
  { hideAppBar: true }
);
