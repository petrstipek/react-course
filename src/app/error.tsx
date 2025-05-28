"use client";
import { Header } from "@/components/header/header";
import Link from "next/link";

export default function Error() {
  return (
    <>
      <Header
        title="Well, this went sideways..."
        subtitle="Something broke. It's probably our fault. Or yours. Who knows."
      />
      <div className="todo-detail-error">
        <p>
          We ran into an unexpected error. The page panicked, spilled coffee,
          and ran away.
        </p>
        <Link href="/">
          <button className="back-button">Try Again or Go Home</button>
        </Link>
      </div>
    </>
  );
}
