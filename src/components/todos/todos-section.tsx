import { Todo } from "@prisma/client";
import { TodoItem } from "./todo-item";

type Props = {
  todos: Todo[];
};

export const TodosSection = ({ todos }: Props) => {
  return (
    <main>
      <div className="todo-container">
        <ul>
          {todos?.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />;
          })}
        </ul>
      </div>
    </main>
  );
};
