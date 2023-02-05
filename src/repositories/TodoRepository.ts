import { TodoListModel, TodoModel } from "@/models/Todo";
import { GetTodos200, PostTodos200, PostTodosBody } from "@/pages/api/todos";
import { DeleteTodo200, PatchTodo200 } from "@/pages/api/todos/[tid]";
import { useDeleteTodoMutator } from "@/queries/useTodos";
import axios, { AxiosResponse } from "axios";

export class TodoRepository {
  constructor(private baseUrl = "/api/todos") {}

  async getAll(): Promise<TodoListModel> {
    return axios
      .get<GetTodos200>(this.baseUrl)
      .then(({ data }) => new TodoListModel(data.data));
  }

  async createTodo(title: string): Promise<TodoModel> {
    return axios
      .post<PostTodos200, AxiosResponse<PostTodos200>, PostTodosBody>(
        this.baseUrl,
        [new TodoModel({ title }).unwrap()]
      )
      .then(({ data }) => new TodoModel(data.data[0]));
  }

  async deleteTodo(id: number) {
    return axios
      .delete<DeleteTodo200>(`${this.baseUrl}/${id}`)
      .then(({ data }) => new TodoListModel(data.data));
  }

  async updateTodoIsComplete(id: number, is_complete: boolean) {
    return axios
      .patch<PatchTodo200>(`/api/todos/${id}`, { is_complete })
      .then(({ data }) => new TodoModel(data.data));
  }
}
