import { Category, Todo } from "@prisma/client";
import { TodoItem } from "./todo-item";

type TodoWithCategory = Todo & {
    category: Category | null;
};

type TodoListSectionProps = {
    title: string;
    todos: TodoWithCategory[];
    bgClassName: string;
};

export const TodoListSection = ({ title, todos, bgClassName }: TodoListSectionProps) => {
    return (
        <div className={`mx-auto mt-6 p-6 ${bgClassName} rounded-xl shadow-md space-y-4`}>
            <h3 className="text-white text-lg font-semibold">{title}</h3>
            <ul>
                {todos.length === 0 ? (
                    <li className="text-gray-400 text-sm mt-2">No todos found.</li>
                ) : (
                    todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
                )}
            </ul>
        </div>
    );
};