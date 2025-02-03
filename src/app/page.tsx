"use client"
import Link from "next/link";
import SubmitForm from "./components/submit";

export default function Home() {
  return (
    <div>
      <SubmitForm />
      <div className="mt-8">
        <Link href="/admin">
          Go to Admin Page
        </Link>
      </div>
    </div>
  );
}
