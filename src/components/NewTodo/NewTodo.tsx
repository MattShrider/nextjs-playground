import type { FormEvent, ChangeEvent } from "react";
import { useState } from "react";
import { useMutateTodos } from "@/queries/useTodos";
import TextField from "@mui/material/TextField";

export interface NewTodoProps {}

export function NewTodo(props: NewTodoProps) {
  const [title, setTitle] = useState("");
  const mutator = useMutateTodos();

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
        value={title}
        onChange={handleChange}
        error={mutator.isError}
        helperText={mutator.error as string}
        disabled={mutator.isLoading}
        label="Todo Title"
      />
    </form>
  );
}
