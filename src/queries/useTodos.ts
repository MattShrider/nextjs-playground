import type { ApiUpdateTodoBody } from "@/pages/api/todos/[tid]";

import axios from "axios";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { GetTodosResponse, PostTodoBody } from "@/pages/api/todos";
import { dbGetTodos, TodoResult } from "@/external/todos";

type TodoState = TodoResult;

export const GET_TODOS_KEY = "todos";

export const useTodos = (): UseQueryResult<TodoState> => {
  return useQuery(GET_TODOS_KEY, async () =>
    axios.get<GetTodosResponse>("/api/todos").then(({ data }) => {
      if (data.status === "success") {
        return {
          todos: data.result?.todos ?? [],
          count: data.result?.count ?? 0,
        };
      }
      console.error("Fetch Error", data);
      throw data.message;
    })
  );
};

export const useInsertTodoMutator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    "insertTodo",
    async (title: string) => axios.post<PostTodoBody>("/api/todos", { title }),
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(GET_TODOS_KEY);
      },
      onSettled(data, error, variables, context) {
        console.log("[settled] mutateTodos", arguments);
      },
    }
  );
};

export const useDeleteTodoMutator = () => {
  const queryClient = useQueryClient();
  return useMutation(
    "deleteTodo",
    async (todoId: number) => axios.delete(`/api/todos/${todoId}`),
    {
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
      onSuccess() {
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
