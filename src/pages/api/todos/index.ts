import {
  ActionResult,
  ActionResult500,
  make200,
  make500,
} from "@/http/responses";
import { supabaseClient } from "@/lib/supabase";
import { NextApiHandler } from "next";

export interface Todo {
  id: number; //bigint
  title: string;
  is_complete: boolean;
  created_at: Date;
}

export interface TodoResult {
  count: number;
  todos: Todo[];
}

export const apiFetchTodos = async (): Promise<TodoResult> => {
  return supabaseClient
    .from("todos")
    .select("*")
    .then(({ data = [], error, count }) => {
      if (error) throw error;
      return { todos: data || [], count: (count || data?.length) ?? 0 };
    });
};

const apiGetTodos: NextApiHandler<ActionResult> = async (req, res) => {
  try {
    const { count, todos } = await apiFetchTodos();
    return make200<TodoResult>(res, { count: count || 0, todos });
  } catch (e) {
    return make500(res, "An error occurred when fetching todos");
  }
};

export type GetTodosResponse = ActionResult<TodoResult> | ActionResult500;
export default apiGetTodos;
