import { TodoDao } from "@/dao/TodoDao";
import { TodoListModel, TodoModel } from "@/models/Todo";
import { TodoRepository } from "@/repositories/TodoRepository";
import type { TodoRow } from "@/types/types";
import isEqual from "lodash/isEqual";

import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";

export const GET_TODOS_KEY = "todos";
const repository = new TodoRepository();

function getTodoListFromQueryClient(client: QueryClient): TodoListModel {
  return (
    client.getQueryData<TodoListModel>(GET_TODOS_KEY) ?? new TodoListModel()
  );
}

export const useTodos = (): UseQueryResult<TodoListModel> => {
  return useQuery(GET_TODOS_KEY, async () => repository.getAll(), {
    refetchInterval: 1000 * 10,
    refetchIntervalInBackground: false,
  });
};

export const useInsertTodoMutator = () => {
  const queryClient = useQueryClient();
  return useMutation<TodoModel, unknown, string>(
    "insertTodo",
    (title) => repository.createTodo(title),
    {
      onMutate(title) {
        queryClient.cancelQueries(GET_TODOS_KEY);
        const todos = getTodoListFromQueryClient(queryClient);
        todos.createPendingTodo();
        queryClient.setQueryData(GET_TODOS_KEY, todos);
      },
      onSuccess() {
        queryClient.invalidateQueries(GET_TODOS_KEY);
      },
    }
  );
};

export const useDeleteTodoMutator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    "deleteTodo",
    async (todoId: number) => repository.deleteTodo(todoId),
    {
      onMutate(todoId) {
        queryClient.cancelQueries(GET_TODOS_KEY);
        const todoList = getTodoListFromQueryClient(queryClient);
        const removed = todoList.get(todoId);
        removed?.setPending(true);
        queryClient.setQueryData(GET_TODOS_KEY, todoList);
      },
      onSuccess() {
        queryClient.invalidateQueries(GET_TODOS_KEY);
      },
    }
  );
};

interface UseUpdateTodoParams {
  id: number;
  is_complete: boolean;
}
export const useUpdateTodoMutator = () => {
  const queryClient = useQueryClient();
  return useMutation<TodoModel, unknown, UseUpdateTodoParams>(
    "updateTodo",
    async ({ id, is_complete }) =>
      repository.updateTodoIsComplete(id, is_complete),
    {
      onMutate({ id, is_complete }) {
        queryClient.cancelQueries(GET_TODOS_KEY);
        const todoList = getTodoListFromQueryClient(queryClient);
        const matching = todoList.get(id);
        matching?.setPending(true)?.setComplete(is_complete);
        queryClient.setQueryData(GET_TODOS_KEY, todoList);
      },
      onSuccess() {
        queryClient.invalidateQueries(GET_TODOS_KEY);
      },
    }
  );
};

const serializeTodoState = (state: DehydratedState): DehydratedState => {
  return {
    ...state,
    queries: state.queries.map((query) => ({
      ...query,
      state: {
        ...query.state,
        data:
          query.queryKey === GET_TODOS_KEY
            ? (query.state.data as TodoListModel).unwrap()
            : query.state.data,
      },
    })),
  };
};

export const deserializeTodoState = (
  state: DehydratedState
): DehydratedState => {
  return {
    ...state,
    queries: state.queries.map((query) => ({
      ...query,
      state: {
        ...query.state,
        data:
          query.queryKey === GET_TODOS_KEY
            ? new TodoListModel(query.state.data as TodoRow[])
            : query.state.data,
      },
    })),
  };
};

export const apiDehydrateUseTodos = async () => {
  const queryClient = new QueryClient();
  const dao = new TodoDao();
  await queryClient.prefetchQuery<TodoListModel>(GET_TODOS_KEY, () =>
    dao.getAll().then(({ data }) => new TodoListModel(data))
  );
  return serializeTodoState(dehydrate(queryClient));
};
