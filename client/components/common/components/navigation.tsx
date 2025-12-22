"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Logout from "./logout-btn";
import UserNameDisplay from "../ui/userNameDisplay";
import { SignOutResponse } from "@/types/todo";

export default function Navigation({ logout } : {
  logout : () => Promise<SignOutResponse>
}) {
  const { user } = useAuth();

  return (
    <nav className="flex items-center justify-between w-full max-w-3xl md:min-w-2xl rounded-xl h-16 px-8 py-4 box-shadow">
      <h1>
        <Link
          className="font-extrabold bg-clip-text gradient text-transparent text-2xl"
          href="/"
        >
          TODOLIST
        </Link>
      </h1>
      <div className="flex items-center  justify-center md:gap-x-8 h-12">
        {user ? (
          <>
            <UserNameDisplay user={user} />
          </>
        ) : null}
        <div className="flex md:gap-4 gap-2">
          {user ? (
            <div className="flex md:gap-4 gap-2">
              <Link className="btn-hover" href={`/my-todo/${user.userId}`}>
                MY TODO
              </Link>
              <Logout action={logout} />
            </div>
          ) : (
            <>
              <Link className="btn-hover" href={"/signin"}>
                SIGN IN
              </Link>
              <Link className="btn-hover" href={"/signup"}>
                SIGN UP
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
