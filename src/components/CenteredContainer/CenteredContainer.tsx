import Box from "@mui/material/Box";
import type { PropsWithChildren } from "react";

export const CenteredContainer = ({
  children,
}: PropsWithChildren): JSX.Element => {
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
