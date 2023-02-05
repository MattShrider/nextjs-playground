import { TodoInsert } from "@/types/types";

export class TodoListModel {
  private _list: TodoModel[] = [];
  /** The server-side count, not the count of _list */
  private _count: number;

  constructor(
    todos: (TodoInsert | TodoModel | null)[] | null | undefined = [],
    count?: number | null | undefined
  ) {
    if (todos?.length) {
      todos?.forEach((todo) => {
        if (!todo) return;
        const next = todo instanceof TodoModel ? todo : new TodoModel(todo);
        this._list.push(next);
      });
    }
    this._count = count ?? this._list.length;
  }

  list() {
    return this._list;
  }

  add(todo: TodoModel): this {
    this._list.push(todo);
    return this;
  }

  get(id: number): TodoModel | undefined {
    return this._list.find((t) => t.id() === id);
  }

  /** Creates a new Todo and adds it to this collection */
  createPendingTodo(todo: TodoInsert = {}): TodoModel {
    const largest = this.getLargestId();
    const added = new TodoModel({ ...todo, id: largest + 1 }).setPending();
    this.add(added);
    return added;
  }

  /** @returns number `-1` when the list is empty, otherwise the largest id in the todolist */
  private getLargestId(): number {
    const largest = this._list.reduce((largest, current) =>
      largest.idNotNull() > current.idNotNull() ? largest : current
    );
    return largest.idNotNull() ?? -1;
  }

  unwrap<T extends TodoInsert = TodoInsert>(): T[] {
    return this._list.map((t) => t.unwrap<T>());
  }
}

export class TodoModel {
  private _pending = false;
  private readonly _data: TodoInsert;

  constructor(todo: TodoInsert = {}) {
    this._data = { ...todo };
    this.setPending(isNaN(this._data.id as number));
    if (this.isPending() && !this._data.created_at) {
      this._data.created_at = new Date().toISOString();
    }
  }

  id(): number | null {
    return this._data.id ?? null;
  }

  title(): string {
    return this._data.title || "";
  }

  is_complete(): boolean {
    return this._data.is_complete || false;
  }

  /** @returns number `this.id()` but defaults to `-1` when null. */
  idNotNull(): number {
    return this.id() ?? -1;
  }

  isPending() {
    return this._pending;
  }

  setPending(isPending = true): this {
    this._pending = isPending;
    return this;
  }

  setComplete(is_complete: boolean = true): this {
    this._data.is_complete = is_complete;
    return this;
  }

  unwrap<T extends TodoInsert = TodoInsert>(): T {
    return this._data as T;
  }
}
