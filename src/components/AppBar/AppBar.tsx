import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ProfileButton } from "../ProfileButton/ProfileButton";
import Link from "next/link";

export interface AppBarProps {}

export function AppBar(props: AppBarProps) {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Link href="/" color="inherit">
          <Typography variant="h6">Next.JS Playground</Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <ProfileButton />
      </Toolbar>
    </MuiAppBar>
  );
}
