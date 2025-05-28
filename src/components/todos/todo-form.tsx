import { createTodo } from "@/actions/todo-actions";

export const TodoForm = () => {
  return (
    <form action={createTodo}>
      <div className="input-group">
        <input name="todo-text" placeholder="What needs to be done?" />
        <select name="todo-priority" defaultValue="">
          <option value="" disabled>
            Select priority
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input name="todo-description" placeholder="Description (optional)" />
        <button type="submit">Add</button>
      </div>
    </form>
  );
};
