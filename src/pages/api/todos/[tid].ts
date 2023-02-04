import { dbDeleteTodo, dbUpdateTodo, Todo } from "@/external/todos";
import {
  ActionResult,
  make200,
  make400,
  make404,
  make500,
} from "@/http/responses";
import { NextApiHandler } from "next";

const apiDeleteTodo: NextApiHandler<ActionResult> = async (req, res) => {
  const { tid } = req.query;
  const todoId = parseInt(tid as string);
  if (!todoId || isNaN(todoId))
    return make400(res, "DELETE todo requires an id path param");

  try {
    return make200(res, await dbDeleteTodo(todoId));
  } catch (e) {
    console.error(e);
    return make500(res, "An error occurred when fetching todos");
  }
};

export interface ApiUpdateTodoBody {
  is_complete: boolean;
}
/** Only allows toggling is_complete */
const apiPatchTodo: NextApiHandler<ActionResult> = async (req, res) => {
  const { tid } = req.query;
  const todoId = parseInt(tid as string);
  if (!todoId || isNaN(todoId))
    return make400(res, "PUT todo requires an id path param");

  const body: ApiUpdateTodoBody = req.body;
  if (body?.is_complete === undefined)
    return make400(res, "PUT todo requires { is_complete: boolean }");

  try {
    return make200(res, await dbUpdateTodo(todoId, body.is_complete));
  } catch (e) {
    console.error(e);
    return make500(res, "an error occurred while updating todo");
  }
};

const routeHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "DELETE":
      return apiDeleteTodo(req, res);
    case "PATCH":
      return apiPatchTodo(req, res);
    default:
      return make404(res);
  }
};

export default routeHandler;
