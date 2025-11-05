"use client";
import { useState } from "react";

type Todo = {
  id: number;
  title: string;
  description: string;
  status: string;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddTodo = () => {
    if (!title.trim() || !description.trim()) return;

    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId
            ? { ...todo, title, description, status }
            : todo
        )
      );
      setEditId(null);
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        title,
        description,
        status,
      };
      setTodos([...todos, newTodo]);
    }

    setTitle("");
    setDescription("");
    setStatus("Pending");
  };

  const handleEdit = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    setTitle(todo.title);
    setDescription(todo.description);
    setStatus(todo.status);
    setEditId(id);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-2">
        📝 Todo List
      </h1>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-5">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-3 text-black"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded mb-3 text-black"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-2 rounded mb-3 text-black"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          onClick={handleAddTodo}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {editId ? "Update Todo" : "Add Todo"}
        </button>
      </div>

      <div className="w-full max-w-md mt-6 space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="border rounded-lg p-4 shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-black font-semibold">{todo.title}</h3>
              <p className="text-gray-600">{todo.description}</p>
              <p
                className={`text-sm ${
                  todo.status === "Completed"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {todo.status.toLowerCase()}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(todo.id)}
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
