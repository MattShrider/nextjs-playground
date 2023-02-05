import { deserializeTodoState, GET_TODOS_KEY } from "@/queries/useTodos";
import { DehydratedState } from "react-query";

export const stateDeserializers: Record<
  string,
  (state: DehydratedState) => DehydratedState
> = {
  [GET_TODOS_KEY]: deserializeTodoState,
};
