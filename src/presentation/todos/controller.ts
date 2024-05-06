import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 2, text: "Buy bread", completedAt: null },
  { id: 3, text: "Buy chocolate", completedAt: new Date() },
];
export class TodosController {
  //* Dependecy Injections
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      return res.status(404).json({ error: `TODO with ${id} not found` });
    }
    return res.json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text required" });

    const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: null,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });
    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(404).json({ error: `Todo with id $${id} not found` });

    const { text, completedAt } = req.body;
    // if (!text)
    //   return res.status(400).json({ error: "Text properti is required" });

    todo.text = text || todo.text;
    if (completedAt === "null") {
      todo.completedAt = null;
    } else {
      todo.completedAt = new Date(completedAt || todo.completedAt);
    }

    res.json(todo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
    } else {
      return res.status(404).json({ error: `Todo with id $${id} not found` });
    }

    res.json(`Todo with id: ${id} deleted`);
  };
}
