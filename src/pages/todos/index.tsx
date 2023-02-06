import type { MyGetServerSideProps } from "@/types/types";
import type { TodoRow } from "@/types/types";

import { Layout } from "@/components/Layout";
import { NewTodo } from "@/components/NewTodo/NewTodo";
import { makePage } from "@/lib/makePage";
import {
  apiDehydrateUseTodos,
  GET_TODOS_KEY,
  useDeleteTodoMutator,
  useTodos,
  useUpdateTodoMutator,
} from "@/queries/useTodos";
import Spinner from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { TodoList } from "@/components/TodoList/TodoList";
import { TodoModel } from "@/models/Todo";
import { withAuthServerSideProps } from "@/lib/supabase";
import { useUser } from "@/queries/useUser";

export default makePage(function NewTodoPage() {
  const { data: user } = useUser();
  const { data: todoList, error } = useTodos();
  const deleteTodoMutator = useDeleteTodoMutator();
  const updateTodoMutator = useUpdateTodoMutator();

  const handleDelete = (todo: TodoModel) => {
    deleteTodoMutator.mutate(todo.idNotNull());
  };

  const handleIsComplete = (todo: TodoModel) => {
    if (!todo.id()) return;
    todo.setComplete(!todo.is_complete());
    updateTodoMutator.mutate({
      id: todo.id() as number,
      is_complete: todo.is_complete(),
    });
  };

  let content: React.ReactNode = "";

  if (todoList) {
    content = (
      <>
        <NewTodo />
        <TodoList
          disableUpdate={!user}
          todos={todoList}
          onDelete={handleDelete}
          onCheck={handleIsComplete}
        />
      </>
    );
  } else if (error) {
    content = (
      <>
        <Typography variant="body2">
          An error has occurred fetching todos
        </Typography>
        <pre>{error as string}</pre>
      </>
    );
  } else {
    content = (
      <>
        <Spinner variant="indeterminate" />
        <Typography>Fetching Todos...</Typography>
      </>
    );
  }

  return <Layout>{content}</Layout>;
});

export const getServerSideProps = withAuthServerSideProps(
  async (context) => {
    const dehydratedState = await apiDehydrateUseTodos();
    console.log(
      "custom context",
      // @ts-expect-error
      context.req.custom
    );

    return {
      props: {
        dehydratedState: dehydratedState,
        stateDeserializer: GET_TODOS_KEY,
      },
    };
  },
  { redirectWhenNoSession: null }
);
