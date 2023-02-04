import type { Todo } from "@/external/todos";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";

export interface TodoListProps {
  todos: Todo[];
  onDelete: (todo: Todo) => void;
  onCheck: (todo: Todo) => void;
}

export function TodoList({
  todos,
  onDelete,
  onCheck,
}: TodoListProps): JSX.Element {
  return (
    <List>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label={`Delete ${todo.title}`}
              onClick={() => onDelete(todo)}
            >
              <Delete />
            </IconButton>
          }
        >
          <ListItemButton role={undefined} onClick={() => onCheck(todo)} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={todo.is_complete}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  "aria-labelledby": `checkbox-list-label-${todo.title}`,
                }}
              />
            </ListItemIcon>
            {todo.title}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
