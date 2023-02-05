import { TodoDao } from "@/dao/TodoDao";
import { TodoInsert, TodoRow } from "@/types/types";
import { NextApiHandler } from "next";

export interface GetTodos200 {
  data: TodoRow[];
}
const apiGetTodos: NextApiHandler = async (req, res) => {
  const dao = new TodoDao();
  try {
    return res.status(200).json((await dao.getAll()) as GetTodos200);
  } catch (e) {
    console.error(e);
    return res.status(500).send(null);
  }
};

export interface PostTodos200 {
  data: TodoRow[];
}
export type PostTodosBody = TodoInsert[];
const apiPostTodos: NextApiHandler = async (req, res) => {
  const body: TodoInsert[] = req.body;
  const dao = new TodoDao();

  try {
    return res.status(200).json((await dao.create(body)) as PostTodos200);
  } catch (e) {
    console.error(e);
    return res.status(500).send(e);
  }
};

const apiTodoRouter: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return apiGetTodos(req, res);
    case "POST":
      return apiPostTodos(req, res);
    default:
      return res
        .status(404)
        .send(`This resource does not support method ${req.method}`);
  }
};

export default apiTodoRouter;
