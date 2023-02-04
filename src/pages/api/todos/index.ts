/* eslint-disable indent */
import { dbCreateTodo, dbGetTodos, TodoResult } from "@/external/todos";
import {
  ActionResult,
  ActionResult500,
  make200,
  make400,
  make404,
  make500,
} from "@/http/responses";
import { NextApiHandler } from "next";

const apiGetTodos: NextApiHandler<ActionResult> = async (req, res) => {
  try {
    return make200(res, await dbGetTodos());
  } catch (e) {
    console.error(e);
    return make500(res, "An error occurred when fetching todos");
  }
};

export interface PostTodoBody {
  title: string;
}
const apiPostTodos: NextApiHandler<ActionResult> = async (req, res) => {
  const body: PostTodoBody = req.body;
  if (!body?.title) {
    return make400(
      res,
      `POST todos requires a body in the format of {"title": string}`
    );
  }

  try {
    return make200(res, await dbCreateTodo(body.title));
  } catch (e) {
    console.error(e);
    return make500(res, "An error occurred when creating todo");
  }
};

const apiTodoRouter: NextApiHandler<ActionResult> = async (req, res) => {
  switch (req.method) {
    case "GET":
      return apiGetTodos(req, res);
    case "POST":
      return apiPostTodos(req, res);
    default:
      return make404(res);
  }
};

export type GetTodosResponse = ActionResult<TodoResult> | ActionResult500;
export default apiTodoRouter;
