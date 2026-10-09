"use client";

import { useState } from "react";
import { useSignOut } from "../use-sign-out";

export default function SignOutButton() {
  const signOut = useSignOut();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await signOut();
    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="btn btn-outline btn-error btn-sm shrink-0 sm:btn-md"
    >
      {loading ? <span className="loading loading-spinner loading-xs" /> : "↩"} সাইন আউট
    </button>
  );
}
