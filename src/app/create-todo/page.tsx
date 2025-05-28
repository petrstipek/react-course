import { Header } from "@/components/header";
import { TodoForm } from "@/components/todos/todo-form";

const createTodoPage = async () => {
    return (
        <>
            <Header title="Create new todo" subtitle="Add your tasks to list!" />
            <TodoForm />
        </>
    )
};

export default createTodoPage;