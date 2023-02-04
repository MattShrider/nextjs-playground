import { rest } from "lodash";
import { NextApiResponse } from "next";

export type ActionResultStatus = "success" | "error";
export interface ActionResult<TData = unknown> {
  message: string | null;
  status: ActionResultStatus;
  result: TData | null;
}
export type ActionResult500 = ActionResult<null> & { status: "error" };

export function make404(res: NextApiResponse) {
  return res.status(404).send(null);
}

export function make400(res: NextApiResponse<ActionResult>, message?: string) {
  return res.status(400).json({
    result: null,
    status: "error",
    message: message ?? "Request invalid",
  });
}

export function make500(res: NextApiResponse<ActionResult>, message?: string) {
  return res.status(500).json({
    result: null,
    status: "error",
    message: message ?? "An unknown error has occurred",
  });
}

export function make200<TData = unknown>(
  res: NextApiResponse<ActionResult<TData>>,
  data?: TData,
  message?: string
) {
  return res.status(200).json({
    result: data || null,
    status: "success",
    message: message || null,
  });
}
