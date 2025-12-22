
import { redirect } from "next/navigation";
import { AuthMe } from "../actions/auth-me";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const validate = await AuthMe();
  if(!validate) redirect("/signin");

  return <>{children}</>;
}
