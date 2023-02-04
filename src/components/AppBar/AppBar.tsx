import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ProfileButton } from "../ProfileButton/ProfileButton";

export interface AppBarProps {}

export function AppBar(props: AppBarProps) {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6">Next.JS Playground</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ProfileButton />
      </Toolbar>
    </MuiAppBar>
  );
}
