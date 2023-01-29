import type { Props } from "@/types";
import Box from "@mui/material/Box";

export const CenteredContainer = ({ children }: Props): JSX.Element => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};
