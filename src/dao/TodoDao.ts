import type { TodoInsert, TodoRow } from "@/types/types";
import { supabaseClient } from "@/lib/supabase";

export class TodoDao {
  private logger = console;
  constructor(private client = supabaseClient) {}

  async getAll(): Promise<{ data: TodoRow[] }> {
    return this.client
      .from("todos")
      .select("*")
      .order("id", { ascending: false })
      .limit(10)
      .then(({ data, error }) => {
        if (error || !data) throw error;
        return { data: data };
      });
  }

  /** id and created_time are ignored */
  async create(todos: TodoInsert[]): Promise<{ data: TodoRow[] }> {
    this.logger.log("create", todos);
    const willInsert = todos.map((todo) => ({
      is_complete: todo.is_complete,
      title: todo.title,
    }));

    return this.client
      .from("todos")
      .insert(willInsert)
      .select()
      .then(({ error, data }) => {
        if (error) throw error;
        if (!data) throw new Error("todo was not created");
        return { data };
      });
  }

  async delete(todos: number[]): Promise<{ data: TodoRow[] }> {
    return this.client
      .from("todos")
      .delete()
      .in("id", todos)
      .select()
      .then(({ error, data }) => {
        if (error || !data) throw error;
        return { data };
      });
  }

  async update(id: number, todo: TodoInsert): Promise<{ data: TodoRow }> {
    const next: TodoInsert = {
      is_complete: todo.is_complete,
      title: todo.title,
    };

    return this.client
      .from("todos")
      .update(next)
      .eq("id", id)
      .select()
      .then(({ error, data }) => {
        if (error || !data) throw error;
        return { data: data[0] };
      });
  }
}
