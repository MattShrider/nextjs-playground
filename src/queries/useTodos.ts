import type { ApiUpdateTodoBody } from "@/pages/api/todos/[tid]";

import axios, { AxiosPromise, AxiosResponse } from "axios";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { GetTodosResponse, PostTodoBody } from "@/pages/api/todos";
import { dbGetTodos, Todo, TodoResult } from "@/external/todos";
import { ActionResult } from "@/http/responses";

export type TodoWithPending = Todo & { __pending?: boolean };
type TodoState = Omit<TodoResult, "todos"> & { todos: TodoWithPending[] };

export const GET_TODOS_KEY = "todos";

export const useTodos = (): UseQueryResult<TodoState> => {
  return useQuery(
    GET_TODOS_KEY,
    async () =>
      axios.get<GetTodosResponse>("/api/todos").then(({ data }) => {
        if (data.status === "success") {
          return {
            todos: data.result?.todos ?? [],
            count: data.result?.count ?? 0,
          };
        }
        console.error("Fetch Error", data);
        throw data.message;
      }),
    {
      refetchInterval: 1000 * 10,
      refetchIntervalInBackground: false,
    }
  );
};

export const useInsertTodoMutator = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<ActionResult<Todo>>, unknown, string>(
    "insertTodo",
    async (title) => axios.post<ActionResult<Todo>>("/api/todos", { title }),
    {
      onMutate(title) {
        queryClient.cancelQueries(GET_TODOS_KEY);
        /* Optimistically add to top of list */
        const todoState = queryClient.getQueryData<TodoState>(
          GET_TODOS_KEY
        ) ?? { count: 0, todos: [] };
        const newTodo: TodoWithPending = {
          id: (todoState?.todos?.[0]?.id ?? 0) + 1,
          created_at: new Date(),
          is_complete: false,
          title,
          __pending: true,
        };
        const newTodos = [newTodo, ...todoState.todos];
        const newState: TodoState = {
          count: newTodos.length,
          todos: newTodos,
        };
        queryClient.setQueryData(GET_TODOS_KEY, newState);
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
    async (todoId: number) =>
      axios.delete<ActionResult<Todo>>(`/api/todos/${todoId}`),
    {
      onMutate(todoId) {
        queryClient.cancelQueries(GET_TODOS_KEY);
        const todoState = queryClient.getQueryData<TodoState>(
          GET_TODOS_KEY
        ) ?? { count: 0, todos: [] };
        const newTodos = todoState.todos.map((t) => ({
          ...t,
          __pending: t.id === todoId ? true : t.__pending,
        }));
        const newState: TodoState = {
          count: newTodos.length,
          todos: newTodos,
        };
        queryClient.setQueryData(GET_TODOS_KEY, newState);
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
  return useMutation(
    "updateTodo",
    async ({ id, is_complete }: UseUpdateTodoParams) => {
      return axios.patch<ApiUpdateTodoBody>(`/api/todos/${id}`, {
        is_complete,
      });
    },
    {
      onMutate({ id, is_complete }) {
        queryClient.cancelQueries(GET_TODOS_KEY);
        const todoState = queryClient.getQueryData<TodoState>(
          GET_TODOS_KEY
        ) ?? { count: 0, todos: [] };
        const newTodos = todoState.todos.map((t) => ({
          ...t,
          is_complete: t.id === id ? is_complete : t.is_complete,
          __pending: t.id === id ? true : t.__pending,
        }));
        const newState: TodoState = {
          count: newTodos.length,
          todos: newTodos,
        };
        queryClient.setQueryData(GET_TODOS_KEY, newState);
      },
      onSuccess(data, { id, is_complete }) {
        queryClient.invalidateQueries(GET_TODOS_KEY);
      },
    }
  );
};

export const apiDehydrateUseTodos = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<TodoState>(GET_TODOS_KEY, dbGetTodos);

  return dehydrate(queryClient);
};
