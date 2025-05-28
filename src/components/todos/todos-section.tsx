import { Todo } from "@prisma/client";
import { TodoItem } from "./todo-item";

type Props = {
  todos: Todo[];
};

export const TodosSection = ({ todos }: Props) => {
  return (
    <main>
      <div className="mx-auto mt-6 p-6 bg-gray-800 rounded-xl shadow-md space-y-4">
        <ul>
          {todos?.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />;
          })}
        </ul>
      </div>
    </main>
  );
};
