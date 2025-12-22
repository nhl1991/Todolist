
import SignInForm from "@/components/signin/signinForm";
import { signin } from "../actions/signIn";
/**
 *
 *  "newEmail@naver.com"
 *  "mypassword",,
 */
export default function Page() {

  return (
    <>
      <header>
        <h1 className="text-3xl my-12">SIGN IN</h1>
      </header>
      <section className="max-w-80 w-full min-w-60 h-80 p-12 flex flex-col items-center justify-between shadow-2xl rounded-xl mb-48">
        <SignInForm  action={signin}/>
      </section>
    </>
  );
}
