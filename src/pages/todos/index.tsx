import type { MyGetServerSideProps } from "@/types";

import { Layout } from "@/components/Layout";
import { NewTodo } from "@/components/NewTodo/NewTodo";
import { makePage } from "@/lib/makePage";
import { dehydrateUseTodos, useTodos } from "@/queries/useTodos";
import Spinner from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default makePage(function NewTodoPage() {
  const { data, error } = useTodos();

  let content: React.ReactNode = "";

  if (data?.todos) {
    content = (
      <>
        <NewTodo />
        {data.todos.map((todo) => (
          <p key={todo.id}>{todo.title}</p>
        ))}
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
  const dehydratedState = await dehydrateUseTodos();
  return {
    props: {
      dehydratedState: dehydratedState,
    },
  };
};
