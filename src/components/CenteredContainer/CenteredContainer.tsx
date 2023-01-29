import type { Props } from "@/types";
import Grid from "@mui/material/Unstable_Grid2";

export const CenteredContainer = ({ children }: Props): JSX.Element => {
  return (
    <Grid
      container
      direction="column"
      spacing="0"
      alignContent="center"
      alignItems="center"
    >
      {children}
    </Grid>
  );
};
