import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import React from "react";
import Button from "@mui/material/Button";

import { useSignOut, useUser } from "@/queries/useUser";
import { useRouter } from "next/router";

export interface ProfileButtonProps {}

export function ProfileButton(props: ProfileButtonProps) {
  const router = useRouter();
  const { data: user, isLoading } = useUser();
  const mutateLogout = useSignOut();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  if (!user && isLoading) return null;

  const logout = () => {
    closeMenu();
    mutateLogout.mutate();
  };
  const login = () => {
    closeMenu();
    router.push("/login");
  };

  const openMenu = (evt: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(evt.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const content: React.ReactNode = user ? (
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
