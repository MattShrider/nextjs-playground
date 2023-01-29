import type { FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";

export interface LoginFormProps {
  email: string;
  onEmail: (email: string) => void;
  pass: string;
  onPass: (pass: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export const LoginForm = ({
  email,
  onEmail,
  pass,
  onPass,
  onSubmit,
}: LoginFormProps): JSX.Element => {
  return (
    <form onSubmit={onSubmit}>
      <Grid>
        <TextField
          required
          id="email"
          value={email}
          onChange={(e) => onEmail(e.target.value)}
          label="Email"
        />
        <TextField
          required
          id="password"
          value={pass}
          onChange={(e) => onPass(e.target.value)}
          label="Password"
          type="password"
        />
        <Button type="submit" color="primary">
          Submit
        </Button>
      </Grid>
    </form>
  );
};
