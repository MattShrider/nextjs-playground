import { supabaseClient } from "@/lib/supabase";
import axios from "axios";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { apiFetchTodos, GetTodosResponse, TodoResult } from "@/pages/api/todos";

type TodoState = TodoResult;

export const GET_TODOS_KEY = "todos";

const fetchTodos = async (): Promise<TodoState> =>
  axios.get<GetTodosResponse>("/api/todos").then(({ data }) => {
    if (data.status === "success") {
      return {
        todos: data.result?.todos ?? [],
        count: data.result?.count ?? 0,
      };
    }
    console.error("Fetch Error", data);
    throw data.message;
  });

export const useTodos = (): UseQueryResult<TodoState> => {
  return useQuery(GET_TODOS_KEY, fetchTodos);
};

export const useMutateTodos = () => {
  const queryClient = useQueryClient();
  return useMutation(
    "todos",
    async (title: string) => {
      await supabaseClient.from("todos").insert({ title });
    },
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

export const apiDehydrateUseTodos = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<TodoState>(GET_TODOS_KEY, apiFetchTodos);

  return dehydrate(queryClient);
};
