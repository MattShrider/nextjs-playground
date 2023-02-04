import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import React from "react";
import { useUser } from "@/lib/auth/useUser";
import Router from "next/router";
import Button from "@mui/material/Button";

export interface ProfileButtonProps {}

export function ProfileButton(props: ProfileButtonProps) {
  const { user, mutateLogout } = useUser({
    redirectOnLogout: "/",
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  if (!user) return null;

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

  const content: React.ReactNode = user?.isLoggedIn ? (
    <>
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
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  ) : (
    <Button color="secondary" variant="contained" onClick={login}>
      Login
    </Button>
  );

  return <div>{content}</div>;
}
