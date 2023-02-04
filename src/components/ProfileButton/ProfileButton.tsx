import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import React from "react";
import { useUser } from "@/lib/auth/useUser";
import Router from "next/router";

export interface ProfileButtonProps {}

export function ProfileButton(props: ProfileButtonProps) {
  const { user, mutateLogout } = useUser({ redirectTo: "/" });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const logout = () => {
    closeMenu();
    mutateLogout.mutate();
  };
  const login = () => {
    closeMenu();
    Router.push("/login");
  };

  const openMenu = (evt: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(evt.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={openMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        {user?.isLoggedIn && <MenuItem onClick={logout}>Logout</MenuItem>}
        {!user?.isLoggedIn && <MenuItem onClick={login}>Login</MenuItem>}
      </Menu>
    </div>
  );
}
