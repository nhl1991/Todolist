import Main from "@/components/common/ui/main";
import { cookies } from "next/headers";
import Link from "next/link";
import { forbidden } from "next/navigation";

export default async function Page() {
  const cookie = await cookies();
  const ok = cookie.get("signup_ok")?.value;
  if(!ok){
      forbidden();
  }
  return (
    <Main>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <p className="text-5xl">登録を完了しました。</p>
        <div className="flex items-center gap-x-2">
          <Link className="btn-hover" href={"/signin"}>
            ログイン
          </Link>
          ページへ
        </div>
      </div>
    </Main>
  );
}
