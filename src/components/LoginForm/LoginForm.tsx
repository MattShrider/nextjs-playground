import type { FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import isString from "lodash/isString";
import { useState } from "react";

export interface LoginFormProps {
  email: string;
  onEmail: (email: string) => void;
  pass: string;
  onPass: (pass: string) => void;
  onSubmit: () => void;
}

const validateRequiredFormField = (
  value: string,
  label: string,
  dirty = false
) => {
  const shouldError = dirty && (!isString(value) || value === "");
  return {
    error: shouldError,
    helperText: shouldError ? `${label} is required` : null,
  };
};

const isFormValid = (email: string, password: string): boolean =>
  Boolean(email && password);

export const LoginForm = ({
  email,
  onEmail,
  pass,
  onPass,
  onSubmit,
}: LoginFormProps): JSX.Element => {
  const [dirty, setDirty] = useState(false);
  const emailValid = validateRequiredFormField(email, "email", dirty);
  const passValid = validateRequiredFormField(pass, "password", dirty);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDirty(true);
    if (isFormValid(email, pass)) {
      onSubmit();
    }
  };

  return (
    <Grid container spacing={2} component="form">
      <Grid xs={12}>
        <TextField
          {...emailValid}
          required
          fullWidth
          id="email"
          value={email}
          onChange={(e) => onEmail(e.target.value)}
          label="Email"
        />
      </Grid>
      <Grid xs={12}>
        <TextField
          {...passValid}
          required
          fullWidth
          id="password"
          value={pass}
          onChange={(e) => onPass(e.target.value)}
          label="Password"
          type="password"
        />
      </Grid>
      <Grid sx={{ display: "flex" }} xs={12} justifyContent="flex-end">
        <Button type="submit" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};
