import type { FormEvent, ChangeEvent } from "react";
import { useState } from "react";
import { useInsertTodoMutator } from "@/queries/useTodos";
import TextField from "@mui/material/TextField";
import { useUser } from "@/queries/useUser";

export interface NewTodoProps {}

export function NewTodo(props: NewTodoProps) {
  const { data: user, isLoading: userIsLoggedIn } = useUser();
  const [title, setTitle] = useState("");
  const mutator = useInsertTodoMutator();

  const requireLogin = !user && !userIsLoggedIn;

  let helperText = "";
  if (requireLogin) {
    helperText = "To make a todo, please log in!";
  } else if (mutator.error) {
    helperText = mutator.error.toString();
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    mutator.mutate(title);
    setTitle("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        disabled={!user && !userIsLoggedIn}
        fullWidth
        value={title}
        onChange={handleChange}
        error={mutator.isError}
        helperText={helperText}
        label="Todo Title"
      />
    </form>
  );
}
