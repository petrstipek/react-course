import Link from "next/link";
import { Header } from "./header/header";

export const TodoDetailError = () => {
  return (
    <>
      <Header
        title="You’re on the wrong path."
        subtitle="This way leads nowhere."
      />
      <div className="todo-detail-error">
        <p>Could not load todo item.</p>
        <Link href="/">
          <button className="back-button">Back to Home</button>
        </Link>
      </div>
    </>
  );
};
