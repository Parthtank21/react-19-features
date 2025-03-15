// https://react.dev/reference/react/useOptimistic

import { useOptimistic, useState } from "react";

const TODOS = [
  { id: 1, title: "Buy Coffee", pending: false },
  { id: 2, title: "Clean Room", pending: false },
  { id: 3, title: "Wash Clothes", pending: false },
];
type TODO = (typeof TODOS)[number];

export default function NewHook4() {
  const [todos, setTodos] = useState(TODOS);
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    todos,
    (state: TODO[], newTodo: TODO) => [...state, newTodo]
  );

  async function addTodo(formData: FormData) {
    const title = formData.get("title") as string;
    const newTodo = {
      id: Date.now(),
      title,
      pending: true,
    };
    setOptimisticTodos(newTodo);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setTodos((prev) => [...prev, { ...newTodo, pending: false }]);
  }

  return (
    <div>
      <form action={addTodo}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" />
        <button type="submit">Add</button>
      </form>
      <ol>
        {optimisticTodos.map((item) => (
          <li key={item.id}>
            {item.title} {item.pending && <small>(Sending...)</small>}
          </li>
        ))}
      </ol>
    </div>
  );
}
