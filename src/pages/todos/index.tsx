import type { MyGetServerSideProps } from "@/types";

import { Layout } from "@/components/Layout";
import { NewTodo } from "@/components/NewTodo/NewTodo";
import { makePage } from "@/lib/makePage";
import {
  apiDehydrateUseTodos,
  useDeleteTodoMutator,
  useTodos,
  useUpdateTodoMutator,
} from "@/queries/useTodos";
import Spinner from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Todo } from "@/external/todos";
import { TodoList } from "@/components/TodoList/TodoList";

export default makePage(function NewTodoPage() {
  const { data, error } = useTodos();
  const deleteTodoMutator = useDeleteTodoMutator();
  const updateTodoMutator = useUpdateTodoMutator();

  const handleDelete = (todo: Todo) => {
    deleteTodoMutator.mutate(todo.id);
  };

  const handleIsComplete = ({ id, is_complete }: Todo) => {
    updateTodoMutator.mutate({ id, is_complete: !is_complete });
  };

  let content: React.ReactNode = "";

  if (data?.todos) {
    content = (
      <>
        <NewTodo />
        <TodoList
          todos={data.todos}
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

export const getServerSideProps: MyGetServerSideProps = async (context) => {
  const dehydratedState = await apiDehydrateUseTodos();
  return {
    props: {
      dehydratedState: dehydratedState,
    },
  };
};
