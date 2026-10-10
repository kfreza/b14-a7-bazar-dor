"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useSignOut } from "./use-sign-out";
import UserAvatar from "./user-avatar";

function closeDropdown() {
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
}

export default function UserMenu() {
  const signOut = useSignOut();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex items-center gap-2" aria-busy="true">
        <div className="skeleton size-9 rounded-[10.5px]" />
        <div className="skeleton hidden h-4 w-16 sm:block" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { user } = session;

  async function handleSignOut() {
    closeDropdown();
    await signOut();
  }

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        aria-label="ইউজার মেনু"
        className="btn btn-ghost h-10 gap-2 pr-2 pl-0 sm:pr-3"
      >
        <UserAvatar name={user.name} image={user.image} size={36} className="rounded-[10.5px]" />
        <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">
          {user.name.split(" ")[0]}
        </span>
        <span aria-hidden className="text-xs opacity-60">
          ▾
        </span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu z-50 mt-2 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-lg"
      >
        <li className="menu-title px-3 py-2 text-base-content">
          <span className="truncate text-sm leading-5.25 font-semibold">{user.name}</span>
          <span className="truncate text-xs leading-4 font-normal opacity-70">{user.email}</span>
        </li>
        <li>
          <Link href="/profile" onClick={closeDropdown} className="text-sm">
            👤 আমার প্রোফাইল
          </Link>
        </li>
        <li>
          <button type="button" onClick={handleSignOut} className="text-sm text-error">
            ↩ সাইন আউট
          </button>
        </li>
      </ul>
    </div>
  );
}
