import { TodoDao } from "@/dao/TodoDao";
import { TodoInsert, TodoRow } from "@/types/types";
import { NextApiHandler } from "next";

export interface DeleteTodo200 {
  data: TodoRow[];
}
const apiDeleteTodo: NextApiHandler = async (req, res) => {
  const { tid } = req.query;
  const todoId = parseInt(tid as string);
  if (!todoId || isNaN(todoId))
    return res.status(400).send("DELETE todo requires an id path param");

  const dao = new TodoDao();
  try {
    return res.status(200).json((await dao.delete([todoId])) as DeleteTodo200);
  } catch (e) {
    console.error(e);
    return res.status(500).send("An error occurred when fetching todos");
  }
};

export interface PatchTodo200 {
  data: TodoRow;
}
const apiPatchTodo: NextApiHandler = async (req, res) => {
  const { tid } = req.query;
  const todoId = parseInt(tid as string);
  if (!todoId || isNaN(todoId))
    return res.status(400).send("PUT todo requires an id path param");

  const body: TodoInsert = req.body;
  if (body?.is_complete === undefined)
    return res.status(400).send("PUT invalid body { is_complete: boolean }");

  const dao = new TodoDao();

  try {
    return res
      .status(200)
      .json((await dao.update(todoId, body)) as PatchTodo200);
  } catch (e) {
    console.error(e);
    return res.status(500).send("an error occurred wh ile updating todo");
  }
};

const routeHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "DELETE":
      return apiDeleteTodo(req, res);
    case "PATCH":
      return apiPatchTodo(req, res);
    default:
      return res
        .status(404)
        .send(`This resource does not support method ${req.method}`);
  }
};

export default routeHandler;
