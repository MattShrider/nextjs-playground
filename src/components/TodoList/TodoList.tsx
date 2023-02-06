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
  disableUpdate: boolean;
  onDelete: (todo: TodoModel) => void;
  onCheck: (todo: TodoModel) => void;
}

export function TodoList({
  todos,
  disableUpdate,
  onDelete,
  onCheck,
}: TodoListProps): JSX.Element {
  const handleCheck = (todo: TodoModel) => {
    if (disableUpdate) return;
    onCheck(todo);
  };

  const handleDelete = (todo: TodoModel) => {
    if (disableUpdate) return;
    onDelete(todo);
  };

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
                disabled={disableUpdate || todo.isPending()}
                aria-label={`Delete ${todo.title()}`}
                onClick={() => handleDelete(todo)}
              >
                <Delete />
              </IconButton>
            }
          >
            <ListItemButton
              role={undefined}
              onClick={() => handleCheck(todo)}
              disabled={todo.isPending()}
              disableRipple={disableUpdate}
              dense
            >
              <>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={todo.is_complete()}
                    disabled={disableUpdate}
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
