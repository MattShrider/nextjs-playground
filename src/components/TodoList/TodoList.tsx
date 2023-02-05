import type { TodoRow } from "@/types/types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import { TodoListModel, TodoModel } from "@/models/Todo";

export interface TodoListProps {
  todos: TodoListModel;
  onDelete: (todo: TodoModel) => void;
  onCheck: (todo: TodoModel) => void;
}

export function TodoList({
  todos,
  onDelete,
  onCheck,
}: TodoListProps): JSX.Element {
  return (
    <List>
      {todos.list().map((todo) => {
        return (
          <ListItem
            disabled={todo.isPending()}
            key={todo.id()}
            secondaryAction={
              <IconButton
                edge="end"
                disabled={todo.isPending()}
                aria-label={`Delete ${todo.title()}`}
                onClick={() => onDelete(todo)}
              >
                <Delete />
              </IconButton>
            }
          >
            <ListItemButton
              role={undefined}
              onClick={() => onCheck(todo)}
              disabled={todo.isPending()}
              dense
            >
              <>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={todo.is_complete()}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": `checkbox-list-label-${todo.title}`,
                    }}
                  />
                </ListItemIcon>
                {todo.title()}
              </>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
