import { supabaseClient } from "@/lib/supabase";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

export const GET_TODOS_KEY = "todos";

const fetchTodos = async () => {
  return supabaseClient
    .from("todos")
    .select("*")
    .then(({ data, error, count }) => {
      if (error) throw error;
      return { todos: data, count };
    });
};

export const useTodos = () => {
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

export const dehydrateUseTodos = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(GET_TODOS_KEY, fetchTodos);

  return dehydrate(queryClient);
};
