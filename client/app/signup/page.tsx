import SignUpForm from "@/components/signup/signupForm";
import { signup } from "../actions/signUp";

export default function Page() {
  return (
    <>
      <header>
        <h1 className="text-3xl my-12">SIGN UP</h1>
      </header>
      <section className="max-w-80 w-full min-w-60 h-96 p-12 flex flex-col items-center justify-between  shadow-2xl rounded-xl mb-48">
        <SignUpForm action={signup} />
      </section>
    </>
  );
}
