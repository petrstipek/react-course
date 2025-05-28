import { Header } from "@/components/header/header";
import Link from "next/link";

export default function Error() {
  return (
    <>
      <Header
        title="Oops! Lost in the void?"
        subtitle="This page took the last train to nowhere."
      />
      <div className="todo-detail-error">
        <p>We looked everywhere… even under the couch. No page here.</p>
        <Link href="/">
          <button className="back-button">
            Let’s go home before it gets weird
          </button>
        </Link>
      </div>
    </>
  );
}
