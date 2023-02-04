import { supabaseClient } from "@/lib/supabase";
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

export const dbGetTodos = async (): Promise<TodoResult> => {
  return supabaseClient
    .from("todos")
    .select("*")
    .order("id", { ascending: false })
    .limit(10)
    .then(({ data = [], error, count }) => {
      if (error) throw error;
      return { todos: data as Todo[], count: (count || data?.length) ?? 0 };
    });
};

export async function dbCreateTodo(title: Todo["title"]): Promise<Todo> {
  return supabaseClient
    .from("todos")
    .insert({ title })
    .select()
    .then(({ error, data }) => {
      if (error) throw error;
      if (!data?.length) throw new Error("todo was not created");
      return data[0];
    });
}

export async function dbDeleteTodo(id: Todo["id"]): Promise<null> {
  return supabaseClient
    .from("todos")
    .delete()
    .eq("id", id)
    .then(({ error }) => {
      if (error) throw error;
      return null;
    });
}

export async function dbUpdateTodo(
  id: Todo["id"],
  is_complete: boolean
): Promise<null> {
  return supabaseClient
    .from("todos")
    .update({ is_complete })
    .eq("id", id)
    .then(({ error }) => {
      if (error) throw error;
      return null;
    });
}
